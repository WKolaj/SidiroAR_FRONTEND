import {
  FETCH_IOS_FILE_TO_SEND,
  SEND_IOS_FILE,
  FETCH_USER_MODEL_DATA,
} from "./types";
import {
  uploadModelIOSFile,
  downloadModelIOSFile,
} from "../services/fileService";
import { exists } from "../utilities/utilities";
import config from "../config.json";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";

export const maxFileSize = config["maxFileSize"];

export const uploadIOSFileActionCreator = function () {
  return async function (dispatch, getState) {
    let currentState = await getState();
    let fileData = currentState.iosFile;

    //Uploading file to backend only if all data was given properly
    if (
      exists(fileData.userId) &&
      exists(fileData.modelId) &&
      exists(fileData.file)
    )
      await uploadModelIOSFile(
        fileData.userId,
        fileData.modelId,
        fileData.file
      );

    await dispatch({
      type: SEND_IOS_FILE,
    });

    //Fetching new model data - fileExists should be now set to true
    let model =
      currentState.data.usersData[fileData.userId].models[fileData.modelId];
    let newModelPayload = { ...model, iosFileExists: true };

    await dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: fileData.userId,
        model: newModelPayload,
      },
    });
  };
};

export const uploadIOSFileActionCreatorWrapped = function () {
  return wrapAsyncActionToHandleError(uploadIOSFileActionCreator());
};

export const fetchIOSFileToSendActionCreator = function (
  userId,
  modelId,
  file
) {
  return async function (dispatch, getState) {
    //If file is null - do not change anything, cause close was clicked
    if (!exists(file)) return;

    //Checking if max file size exceeds
    if (file.size >= maxFileSize) {
      console.error(
        new Error(`Max file size of ${maxFileSize} Bytes exceeded!`)
      );
      return;
    }

    dispatch({
      type: FETCH_IOS_FILE_TO_SEND,
      payload: {
        userId,
        modelId,
        file,
      },
    });
  };
};

export const fetchAndUploadIOSFileActionCreator = function (
  userId,
  modelId,
  file
) {
  return async function (dispatch, getState) {
    //If file is null - do not change anything, cause close was clicked
    if (!exists(file)) return;

    //Checking if max file size exceeds
    if (file.size >= maxFileSize) {
      throw new Error(
        `Max file size of ${(maxFileSize / 1024 / 1024).toFixed(
          2
        )} MB exceeded!`
      );
    }

    await dispatch({
      type: FETCH_IOS_FILE_TO_SEND,
      payload: {
        userId,
        modelId,
        file,
      },
    });

    await dispatch(uploadIOSFileActionCreator());
  };
};

export const fetchAndUploadIOSFileActionCreatorWrapped = function (
  userId,
  modelId,
  file
) {
  return wrapAsyncActionToHandleError(
    fetchAndUploadIOSFileActionCreator(userId, modelId, file)
  );
};

export const downloadIOSFileActionCreator = function (userId, modelId) {
  return async function (dispatch, getState) {
    await downloadModelIOSFile(userId, modelId);
  };
};

export const downloadIOSFileActionCreatorWrapped = function (userId, modelId) {
  return wrapAsyncActionToHandleError(
    downloadIOSFileActionCreator(userId, modelId)
  );
};
