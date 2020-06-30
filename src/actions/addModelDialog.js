import {
  ADD_MODEL_DIALOG_SHOW,
  ADD_MODEL_DIALOG_HIDE,
  FETCH_USER_MODEL_DATA,
  ADD_MODEL_DIALOG_SWITCH_TO_NEW_MODEL,
  ADD_MODEL_DIALOG_SWITCH_TO_CLONE_MODEL,
} from "./types";
import { postModelData } from "../services/dataService";
import { uploadFileActionCreator, fetchFileToSendActionCreator } from "./file";
import {
  uploadIOSFileActionCreator,
  fetchIOSFileToSendActionCreator,
} from "./iosFile";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";
import { exists } from "../utilities/utilities";

export const showAddModelDialogActionCreator = function (userId) {
  return {
    type: ADD_MODEL_DIALOG_SHOW,
    payload: {
      userId,
    },
  };
};

export const hideAddModelDialogActionCreator = function () {
  return {
    type: ADD_MODEL_DIALOG_HIDE,
  };
};

export const switchToNewModelDialogActionCreator = function () {
  return {
    type: ADD_MODEL_DIALOG_SWITCH_TO_NEW_MODEL,
  };
};

export const switchToCloneModelDialogActionCreator = function () {
  return {
    type: ADD_MODEL_DIALOG_SWITCH_TO_CLONE_MODEL,
  };
};

export const createModelAndUploadFiles = function (
  userId,
  modelPayload,
  androidFile,
  iosFile
) {
  return async function (dispatch, getState) {
    //Invoking method manually - in order to get created models id
    let model = await postModelData(userId, modelPayload);
    await dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model,
      },
    });

    let modelId = model._id;

    //Uploading android file only if exists
    if (exists(androidFile)) {
      await dispatch(
        fetchFileToSendActionCreator(userId, modelId, androidFile)
      );
      await dispatch(uploadFileActionCreator());
    }

    //Uploading ios file only if exists
    if (exists(iosFile)) {
      await dispatch(fetchIOSFileToSendActionCreator(userId, modelId, iosFile));
      await dispatch(uploadIOSFileActionCreator());
    }
  };
};

export const createModelAndUploadFilesWrapped = function (
  userId,
  modelPayload,
  file,
  iosFile
) {
  return wrapAsyncActionToHandleError(
    createModelAndUploadFiles(userId, modelPayload, file, iosFile)
  );
};
