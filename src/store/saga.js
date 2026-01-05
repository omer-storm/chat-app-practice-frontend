import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import { receiveMessage, userTyping, userStopTyping } from './actions';
import { SEND_MESSAGE, SOCKET_CONNECTED, TYPING_START, TYPING_STOP } from './actionTypes';
import { getSocket } from './socket';



function createSocketChannel() {
    return eventChannel((emit) => {
        const socket = getSocket();
        console.log('Socket channel created');

        socket.on('receive_message', (message) => {
            console.log('Received message:', message);
            emit(receiveMessage(message));
        });

        socket.on('user_typing', (data) => {
            console.log('User typing:', data);
            emit(userTyping(data));
        });

        socket.on('user_stop_typing', (data) => {
            console.log('User stopped typing:', data);
            emit(userStopTyping(data));
        });

        return () => {
            console.log('Socket channel closed');
            socket.off('receive_message');
            socket.off('user_typing');
            socket.off('user_stop_typing');
        };
    });
}


function* listenForMessages() {
    console.log('listenForMessages saga started, waiting for SOCKET_CONNECTED...');
    yield take(SOCKET_CONNECTED);
    console.log('SOCKET_CONNECTED! Creating socket channel...');

    const channel = yield call(createSocketChannel);
    console.log('Socket channel created, now listening for messages...');

    while (true) {
        const action = yield take(channel);
        console.log('Message taken from channel:', action);
        yield put(action);
        console.log('Action dispatched to store:', action);
    }
}

function* sendMessageSaga() {
    console.log('sendMessageSaga started, waiting for SOCKET_CONNECTED...');
    yield take(SOCKET_CONNECTED);
    console.log('SOCKET_CONNECTED! Socket ready for sending messages...');

    const socket = getSocket();

    while (true) {
        const { payload } = yield take(SEND_MESSAGE);
        console.log('SEND_MESSAGE action received:', payload);
        socket.emit('send_message', payload);
        console.log('Message emitted to server:', payload);
    }
}

function* typingFlowSaga() {
    yield take(SOCKET_CONNECTED);
    const socket = getSocket();

    while (true) {
        const action = yield take([TYPING_START, TYPING_STOP]);
        if (action.type === TYPING_START) {
            socket.emit('typing_start');
            console.log('typing_start emitted');
        } else {
            socket.emit('typing_stop');
            console.log('typing_stop emitted');
        }
    }
}



export default function* rootSaga() {
    yield fork(listenForMessages);
    yield fork(sendMessageSaga);
    yield fork(typingFlowSaga);
}
