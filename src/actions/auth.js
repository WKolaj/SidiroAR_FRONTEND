import { LOGIN_USER, LOGIN_USER_WITH_JWT, LOGOUT_USER } from "./types";

import { logout, login, loginWithJWT } from "../services/authService";

export const loginUserWithJWTActionCreator = function(jwt) {
  let currentUser = loginWithJWT(jwt);
  return {
    type: LOGIN_USER_WITH_JWT,
    payload: {
      user: currentUser
    }
  };
};

export const loginUserActionCreator = function(email, password) {
  return async function(dispatch, getState) {
    let currentUser = await login(email, password);
    dispatch({
      type: LOGIN_USER,
      payload: {
        user: currentUser
      }
    });
  };
};

export const logoutUserActionCreator = function() {
  logout();
  return {
    type: LOGOUT_USER
  };
};
