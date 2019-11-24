import {LOGIN_FAILED_AUTHENTICATION_ERROR, LOGIN_SUCCESS} from "../actionTypes";

const initialState = {
  user: {},
  token: null,
  authenticationError: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {token} = action.payload;
      return {...state, authenticationError: false, token};
    case LOGIN_FAILED_AUTHENTICATION_ERROR:
      return {...state, authenticationError: true, token: null};
    default:
      return state;
  }
}
