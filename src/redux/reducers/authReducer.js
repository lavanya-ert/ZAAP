import {LOGIN_USER, LOGOUT_USER} from '../actions/authActions';

const initialState = {
  userLoggedIn: false,
  userEmail: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoggedIn: true,
        userEmail: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userLoggedIn: false,
        userEmail: null,
      };
    default:
      return state;
  }
};

export default authReducer;
