import { FETCH_FILE_TO_SEND, SEND_FILE, FETCH_USER_MODEL_DATA } from "./types";
import { uploadModelFile } from "../services/fileService";
import { exists } from "../utilities/utilities";
import config from "../config.json";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";

export const maxFileSize = config["maxFileSize"];

export const uploadFileActionCreator = function() {
  return async function(dispatch, getState) {
    let currentState = await getState();
    let fileData = currentState.file;

    //Uploading file to backend only if all data was given properly
    if (
      exists(fileData.userId) &&
      exists(fileData.modelId) &&
      exists(fileData.file)
    )
      await uploadModelFile(fileData.userId, fileData.modelId, fileData.file);

    await dispatch({
      type: SEND_FILE
    });

    //Fetching new model data - fileExists should be now set to true
    let model =
      currentState.data.usersData[fileData.userId].models[fileData.modelId];
    let newModelPayload = { ...model, fileExists: true };

    await dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: fileData.userId,
        model: newModelPayload
      }
    });
  };
};

export const uploadFileActionCreatorWrapped = function() {
  return wrapAsyncActionToHandleError(uploadFileActionCreator());
};

export const fetchFileToSendActionCreator = function(userId, modelId, file) {
  return async function(dispatch, getState) {
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
      type: FETCH_FILE_TO_SEND,
      payload: {
        userId,
        modelId,
        file
      }
    });
  };
};

export const fetchAndUploadFileActionCreator = function(userId, modelId, file) {
  return async function(dispatch, getState) {
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
      type: FETCH_FILE_TO_SEND,
      payload: {
        userId,
        modelId,
        file
      }
    });

    await dispatch(uploadFileActionCreator());
  };
};

export const fetchAndUploadFileActionCreatorWrapped = function(
  userId,
  modelId,
  file
) {
  return wrapAsyncActionToHandleError(
    fetchAndUploadFileActionCreator(userId, modelId, file)
  );
};
