import { LOGIN_DIALOG_HIDE, LOGIN_DIALOG_SHOW } from "./types";
import { reset } from "redux-form";

export const showLoginDialogActionCreator = function() {
  return {
    type: LOGIN_DIALOG_SHOW
  };
};

export const hideLoginDialogActionCreator = function() {
  return async function(dispatch, getState) {
    //Resetting login dialog when hiding
    await dispatch(reset("loginDialog"));
    await dispatch({
      type: LOGIN_DIALOG_HIDE
    });
  };
};
