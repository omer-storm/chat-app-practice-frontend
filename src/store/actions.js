import { SEND_MESSAGE, RECEIVE_MESSAGE, SOCKET_CONNECTED, TYPING_START, TYPING_STOP, USER_STOP_TYPING, USER_TYPING } from './actionTypes';

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


export const typingStart = () => ({
    type: TYPING_START
});

export const typingStop = () => ({
    type: TYPING_STOP
});


export const userTyping = (payload) => ({
    type: USER_TYPING,
    payload
});

export const userStopTyping = (payload) => ({
    type: USER_STOP_TYPING,
    payload
});