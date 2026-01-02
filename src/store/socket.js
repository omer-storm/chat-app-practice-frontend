import { io } from 'socket.io-client';
import { socketConnected } from './actions';

let socket;

export const connectSocket = (username, dispatch) => {
    socket = io("http://localhost:4000", {
        auth: { username },
    });

    socket.on('connect', () => {
        dispatch(socketConnected());
    });

    return socket;
};

export const getSocket = () => socket;
