import { SEND_MESSAGE, RECEIVE_MESSAGE, SOCKET_CONNECTED } from './actionTypes';

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload: message,
});

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    payload: message,
});

export const socketConnected = () => ({
    type: SOCKET_CONNECTED,
});