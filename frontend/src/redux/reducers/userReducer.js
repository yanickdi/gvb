import {LOGIN_FAILED_AUTHENTICATION_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../actionTypes";

const initialState = {
  token: localStorage.getItem('token'),
  authenticationError: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {token} = action.payload;
      localStorage.setItem('token', token);
      return {...state, authenticationError: false, token};
    case LOGIN_FAILED_AUTHENTICATION_ERROR:
      return {...state, authenticationError: true, token: null};
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {...state, token: null};
    default:
      return state;
  }
}
