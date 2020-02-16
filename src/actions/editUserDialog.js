import { EDIT_USER_DIALOG_HIDE, EDIT_USER_DIALOG_SHOW } from "./types";

export const showEditUserDialogActionCreator = function(userId) {
  return {
    type: EDIT_USER_DIALOG_SHOW,
    payload: {
      userId: userId
    }
  };
};

export const hideEditUserDialogActionCreator = function() {
  return {
    type: EDIT_USER_DIALOG_HIDE
  };
};
