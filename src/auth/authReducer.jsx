// authReducer.js
import { AuthActionTypes } from './authAction';

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case AuthActionTypes.LOGOUT:
      // Handle logout action
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
