import {
  ADD_MODEL_DIALOG_SHOW,
  ADD_MODEL_DIALOG_HIDE,
  FETCH_USER_MODEL_DATA
} from "./types";
import { postModelData } from "../services/dataService";
import { uploadFileActionCreator, fetchFileToSendActionCreator } from "./file";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";

export const showAddModelDialogActionCreator = function(userId) {
  return {
    type: ADD_MODEL_DIALOG_SHOW,
    payload: {
      userId
    }
  };
};

export const hideAddModelDialogActionCreator = function() {
  return {
    type: ADD_MODEL_DIALOG_HIDE
  };
};

export const createModelAndUploadFile = function(userId, modelPayload, file) {
  return async function(dispatch, getState) {
    //Invoking method manually - in order to get created models id
    let model = await postModelData(userId, modelPayload);
    await dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model
      }
    });

    let modelId = model._id;

    await dispatch(fetchFileToSendActionCreator(userId, modelId, file));
    await dispatch(uploadFileActionCreator());
  };
};

export const createModelAndUploadFileWrapped = function(
  userId,
  modelPayload,
  file
) {
  return wrapAsyncActionToHandleError(
    createModelAndUploadFile(userId, modelPayload, file)
  );
};
