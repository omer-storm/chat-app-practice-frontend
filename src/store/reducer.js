import { RECEIVE_MESSAGE, USER_TYPING, USER_STOP_TYPING } from './actionTypes';

const initialState = {
    messages: [],
    typingUsers: []
};



export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case USER_TYPING:
            return {
                ...state,
                typingUsers: [
                    ...state.typingUsers.filter(u => u.socketId !== action.payload.socketId),
                    action.payload
                ]
            };

        case USER_STOP_TYPING:
            return {
                ...state,
                typingUsers: state.typingUsers.filter(
                    u => u.socketId !== action.payload.socketId
                )
            };

        default:
            return state;
    }
};
