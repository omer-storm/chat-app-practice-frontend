import { io } from 'socket.io-client';
import { socketConnected } from './actions';

let socket;

export const connectSocket = (username, password, dispatch) => {
    socket = io("http://localhost:4000", {
        auth: { username, password },
    });

    socket.on('connect', () => {
        dispatch(socketConnected());
    });

    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
    });

    return socket;
};

export const getSocket = () => socket;
