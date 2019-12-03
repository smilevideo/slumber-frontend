import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './userReducer';
import sleepReducer from './sleepReducer';
import dreamReducer from './dreamReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer,
    sleepReducer,
    dreamReducer
});

export default createRootReducer;