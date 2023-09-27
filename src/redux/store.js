import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  photos: reducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
