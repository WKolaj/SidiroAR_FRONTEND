import { REMOVE_USER_DIALOG_HIDE, REMOVE_USER_DIALOG_SHOW } from "./types";

export const showRemoveUserDialogActionCreator = function(userId) {
  return {
    type: REMOVE_USER_DIALOG_SHOW,
    payload: {
      userId: userId
    }
  };
};

export const hideRemoveUserDialogActionCreator = function() {
  return {
    type: REMOVE_USER_DIALOG_HIDE
  };
};
