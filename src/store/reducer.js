import { RECEIVE_MESSAGE } from './actionTypes';

const initialState = {
    messages: [],
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};
