import { FETCH_FILE_TO_SEND, SEND_FILE } from "./types";
import { uploadModelFile } from "../services/fileService";
import { exists } from "../utilities/utilities";
import config from "../config.json";
import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";

const maxFileSize = config["maxFileSize"];

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

    dispatch({
      type: SEND_FILE
    });
  };
};

export const uploadFileActionCreatorWrapped = function() {
  return wrapAsyncActionToHandleError(loginUserWithJWTActionCreator());
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

export const chooseAndUploadFileActionCreator = function(
  userId,
  modelId,
  file
) {
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
