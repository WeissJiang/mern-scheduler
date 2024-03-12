import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import ticketsReducer from './tickets/reducer';

const rootReducer = combineReducers({
    tickets: ticketsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;