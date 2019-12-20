import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/NavBar.css';
import './css/Home.css';
import './css/SleepHistory.css';
import './css/SleepForm.css';
import './css/DreamForm.css';
import './css/SleepView.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers/rootReducer';

export const history = createBrowserHistory();

const store = createStore(createRootReducer(history), compose(
    applyMiddleware(
        thunk,
        routerMiddleware(history)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

