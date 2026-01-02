import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { chatReducer } from './store/reducer';
import rootSaga from './store/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    chatReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
