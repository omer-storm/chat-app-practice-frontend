import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import { receiveMessage } from './actions';
import { SEND_MESSAGE, SOCKET_CONNECTED } from './actionTypes';
import { getSocket } from './socket';



function createSocketChannel() {
    return eventChannel((emit) => {
        const socket = getSocket();
        console.log('Socket channel created');

        socket.on('receive_message', (message) => {
            console.log('Received message from server:', message);
            emit(receiveMessage(message));
        });

        return () => {
            console.log('Socket channel closed');
            socket.off('receive_message');
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


export default function* rootSaga() {
    yield fork(listenForMessages);
    yield fork(sendMessageSaga);
}
