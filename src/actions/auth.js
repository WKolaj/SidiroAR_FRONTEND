import { LOGIN_USER, LOGIN_USER_WITH_JWT, LOGOUT_USER } from "./types";
import { logout, login, loginWithJWT } from "../services/authService";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";
import { fetchCurrentUserDataActionCreator } from "./data";
import { changeLanguageActionCreator } from "./language";
import { exists } from "../utilities/utilities";

export const loginUserWithJWTActionCreator = function (jwt) {
  return async function (dispatch, getState) {
    let currentUser = loginWithJWT(jwt);

    await dispatch({
      type: LOGIN_USER_WITH_JWT,
      payload: {
        user: currentUser,
      },
    });

    //Refreshing data also regarind current user data
    await dispatch(fetchCurrentUserDataActionCreator());

    //Changing language to default for given user
    if (exists(currentUser.defaultLang))
      await dispatch(changeLanguageActionCreator(currentUser.defaultLang));
  };
};

export const loginUserWithJWTActionCreatorWrapped = function (jwt) {
  return wrapAsyncActionToHandleError(loginUserWithJWTActionCreator(jwt));
};

export const loginUserActionCreator = function (email, password) {
  return async function (dispatch, getState) {
    let currentUser = await login(email, password);
    await dispatch({
      type: LOGIN_USER,
      payload: {
        user: currentUser,
      },
    });

    //Refreshing data also regarind current user data
    await dispatch(fetchCurrentUserDataActionCreator());

    //Changing language to default for given user
    if (exists(currentUser.defaultLang))
      await dispatch(changeLanguageActionCreator(currentUser.defaultLang));
  };
};

export const loginUserActionCreatorWrapped = function (email, password) {
  return wrapAsyncActionToHandleError(
    loginUserActionCreator(email, password),
    "Niepoprawny email lub hasło"
  );
};

export const logoutUserActionCreator = function () {
  return async function (dispatch, getState) {
    logout();

    await dispatch({
      type: LOGOUT_USER,
    });

    //Refreshing data also regarind current user data
    await dispatch(fetchCurrentUserDataActionCreator());
  };
};

export const logoutUserActionCreatorWrapped = function () {
  return wrapAsyncActionToHandleError(logoutUserActionCreator());
};
