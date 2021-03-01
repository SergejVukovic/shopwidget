import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const devtools = process.env.NODE_ENV === 'production'
    ? x => x /* eslint-disable no-underscore-dangle */
    : window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable no-underscore-dangle */
let store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    devtools
));

export default store;
