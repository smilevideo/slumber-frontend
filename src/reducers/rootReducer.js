import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './userReducer';
import sleepReducer from './sleepReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer,
    sleepReducer
});

export default createRootReducer;