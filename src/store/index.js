import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import persistedReducer from "./reducers";
import {persistStore} from "redux-persist";

const devtools = process.env.NODE_ENV === 'production'
    ? x => x /* eslint-disable no-underscore-dangle */
    : window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable no-underscore-dangle */

let store = devtools ?
    createStore(persistedReducer, compose(
        applyMiddleware(thunk),
        devtools
    ))
    :
    createStore(persistedReducer, compose(
        applyMiddleware(thunk)
    ));

let persistor = persistStore(store);

export {
    store,
    persistor
};
