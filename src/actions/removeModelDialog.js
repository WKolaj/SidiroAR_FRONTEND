import { REMOVE_MODEL_DIALOG_HIDE, REMOVE_MODEL_DIALOG_SHOW } from "./types";

export const showRemoveModelDialogActionCreator = function(userId, modelId) {
  return {
    type: REMOVE_MODEL_DIALOG_SHOW,
    payload: {
      userId: userId,
      modelId: modelId
    }
  };
};

export const hideRemoveModelDialogActionCreator = function() {
  return {
    type: REMOVE_MODEL_DIALOG_HIDE
  };
};
