import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import { receiveMessage } from './actions';
import { SEND_MESSAGE } from './actionTypes';
import { socket } from './socket';



function createSocketChannel() {
    return eventChannel((emit) => {
        socket.on('receive_message', (message) => {
            emit(receiveMessage(message));
        });

        return () => socket.off('receive_message');
    });
}

function* listenForMessages() {
    const channel = yield call(createSocketChannel);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* sendMessageSaga() {
    while (true) {
        const { payload } = yield take(SEND_MESSAGE);
        socket.emit('send_message', payload);
    }
}

export default function* rootSaga() {
    yield fork(listenForMessages);
    yield fork(sendMessageSaga);
}
