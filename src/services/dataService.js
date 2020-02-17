import http from "./httpService";
import config from "../config.json";
import _ from "lodash";
import { getCurrentJWT } from "./authService";
import { exists, existsAndIsNotEmpty } from "../utilities/utilities";

const userRoute = config["userRoute"];
const modelRoute = config["modelRoute"];

//Method for converting lists of models from user payload to object with models collection
const convertUserListsToModels = function(userPayload) {
  if (!exists(userPayload)) return {};
  if (!existsAndIsNotEmpty(userPayload.modelIds)) return {};
  if (!existsAndIsNotEmpty(userPayload.modelNames)) return {};
  if (!existsAndIsNotEmpty(userPayload.filesExist)) return {};

  //Checking and returing empty object if length of arrays is not valid
  let modelIdsCount = userPayload.modelIds.length;
  let modelNamesCount = userPayload.modelNames.length;
  let filesExistCount = userPayload.filesExist.length;

  if (modelIdsCount !== modelNamesCount || modelIdsCount !== filesExistCount)
    return {};

  //Converting lists from user payload to collection of models object
  let modelsCount = modelIdsCount;
  let objectToReturn = {};

  for (let i = 0; i < modelsCount; i++) {
    let modelId = userPayload.modelIds[i];
    let modelName = userPayload.modelNames[i];
    let modelFileExist = userPayload.filesExist[i];

    objectToReturn[modelId] = {
      _id: modelId,
      name: modelName,
      fileExists: modelFileExist
    };
  }

  return objectToReturn;
};

//Method for converting user payload from server response to user data
const getUserDataFromPayload = function(userPayload) {
  //Retrieving all neccessary info from data
  let dataToReturn = _.pick(userPayload, "_id", "email", "name", "permissions");

  //Converting lists of model names, ids and fileExists to object containt models
  dataToReturn.models = convertUserListsToModels(userPayload);

  return dataToReturn;
};

//Method for converting users list from server response to object with users
const getUsersDataFromPayload = function(usersPayload) {
  let objectToReturn = {};

  for (let userPayload of usersPayload) {
    objectToReturn[userPayload._id] = getUserDataFromPayload(userPayload);
  }

  return objectToReturn;
};

//Method for getting model data based on its payload from server response
const getModelDataFromPayload = function(modelPayload) {
  //Retrieving all neccessary info from data
  let dataToReturn = _.pick(modelPayload, "_id", "name", "fileExists");

  return dataToReturn;
};

//Method for converting lists of models to object contain models
const getModelsDataFromPayload = function(modelsPayload) {
  let objectToReturn = {};

  for (let modelPayload of modelsPayload) {
    objectToReturn[modelPayload._id] = getModelDataFromPayload(modelPayload);
  }

  return objectToReturn;
};

export async function getLoggedUserData() {
  //Returning null if there is no logged user
  if (!exists(getCurrentJWT())) return null;

  //Getting users data based on jwt from server
  let response = await http.get(`${userRoute}/me`);
  let userPayload = response.data;

  return getUserDataFromPayload(userPayload);
}

export async function putLoggedUserData(userPayload) {
  //Returning null if there is no logged user
  if (!exists(getCurrentJWT())) return null;

  let response = await http.put(`${userRoute}/me`, userPayload);
  let userData = getUserDataFromPayload(response.data);

  return userData;
}

export async function getUserData(id) {
  let response = await http.get(`${userRoute}/${id}`);
  let userPayload = response.data;

  return getUserDataFromPayload(userPayload);
}

export async function getAllUsersData() {
  //Getting users data based on jwt from server
  let response = await http.get(`${userRoute}`);
  let usersPayload = getUsersDataFromPayload(response.data);

  return usersPayload;
}

export async function getUserModelsData(userId) {
  //Getting all models
  let response = await http.get(`${modelRoute}/${userId}`);
  let usersPayload = getModelsDataFromPayload(response.data);

  return usersPayload;
}

export async function getUserModelData(userId, modelId) {
  //Getting exact model
  let response = await http.get(`${modelRoute}/${userId}/${modelId}`);
  let modelData = getModelDataFromPayload(response.data);

  return modelData;
}

export async function postUserData(userPayload) {
  let response = await http.post(`${userRoute}`, userPayload);
  let userData = getUserDataFromPayload(response.data);

  return userData;
}

export async function postModelData(userId, modelPayload) {
  let response = await http.post(`${modelRoute}/${userId}`, modelPayload);
  let modelData = getModelDataFromPayload(response.data);

  return modelData;
}

export async function deleteUserData(userId) {
  let response = await http.delete(`${userRoute}/${userId}`);
  let userData = getUserDataFromPayload(response.data);

  return userData;
}

export async function deleteModelData(userId, modelId) {
  let response = await http.delete(`${modelRoute}/${userId}/${modelId}`);
  let modelData = getModelDataFromPayload(response.data);

  return modelData;
}

export async function putUserData(userId, userPayload) {
  let response = await http.put(`${userRoute}/${userId}`, userPayload);
  let userData = getUserDataFromPayload(response.data);

  return userData;
}

export async function putModelData(userId, modelId, modelPayload) {
  let response = await http.put(
    `${modelRoute}/${userId}/${modelId}`,
    modelPayload
  );
  let modelData = getModelDataFromPayload(response.data);

  return modelData;
}
