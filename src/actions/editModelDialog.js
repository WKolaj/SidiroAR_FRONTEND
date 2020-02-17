import { EDIT_MODEL_DIALOG_HIDE, EDIT_MODEL_DIALOG_SHOW } from "./types";

export const showEditModelDialogActionCreator = function(userId, modelId) {
  return {
    type: EDIT_MODEL_DIALOG_SHOW,
    payload: {
      userId: userId,
      modelId: modelId
    }
  };
};

export const hideEditModelDialogActionCreator = function() {
  return {
    type: EDIT_MODEL_DIALOG_HIDE
  };
};
