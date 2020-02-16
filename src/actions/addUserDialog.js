import { ADD_USER_DIALOG_HIDE, ADD_USER_DIALOG_SHOW } from "./types";

export const showAddUserDialogActionCreator = function() {
  return {
    type: ADD_USER_DIALOG_SHOW
  };
};

export const hideAddUserDialogActionCreator = function() {
  return {
    type: ADD_USER_DIALOG_HIDE
  };
};
