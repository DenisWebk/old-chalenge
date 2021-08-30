import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { contactsReducer } from 'store/reducers';

export default createStore(contactsReducer, applyMiddleware(thunk));
