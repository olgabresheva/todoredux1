import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import task from './reducers';

const store = createStore(task, composeWithDevTools(
    applyMiddleware(),
));

export default store;