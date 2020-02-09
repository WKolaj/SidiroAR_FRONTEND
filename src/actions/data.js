import {
  FETCH_CURRENT_USER_DATA,
  FETCH_ALL_USERS_DATA,
  FETCH_USER_DATA,
  FETCH_USER_MODELS_DATA,
  FETCH_USER_MODEL_DATA,
  DELETE_MODEL_DATA,
  DELETE_USER_DATA
} from "./types";

import {
  getLoggedUserData,
  putLoggedUserData,
  getAllUsersData,
  getUserData,
  getUserModelsData,
  getUserModelData,
  postUserData,
  postModelData,
  deleteModelData,
  deleteUserData,
  putModelData,
  putUserData
} from "../services/dataService";

export const fetchCurrentUserDataActionCreator = function() {
  return async function(dispatch, getState) {
    let currentUser = await getLoggedUserData();
    dispatch({
      type: FETCH_CURRENT_USER_DATA,
      payload: {
        user: currentUser
      }
    });
  };
};

export const putCurrentUserDataActionCreator = function(userPayload) {
  return async function(dispatch, getState) {
    let user = await putLoggedUserData(userPayload);
    dispatch({
      type: FETCH_CURRENT_USER_DATA,
      payload: {
        user: user
      }
    });
  };
};

export const fetchAllUsersDataActionCreator = function() {
  return async function(dispatch, getState) {
    let users = await getAllUsersData();
    dispatch({
      type: FETCH_ALL_USERS_DATA,
      payload: {
        users: users
      }
    });
  };
};

export const fetchUserDataActionCreator = function(id) {
  return async function(dispatch, getState) {
    let user = await getUserData(id);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user
      }
    });
  };
};

export const fetchModelsDataActionCreator = function(userId) {
  return async function(dispatch, getState) {
    let models = await getUserModelsData(userId);
    dispatch({
      type: FETCH_USER_MODELS_DATA,
      payload: {
        userId: userId,
        models: models
      }
    });
  };
};

export const fetchModelDataActionCreator = function(userId, modelId) {
  return async function(dispatch, getState) {
    let model = await getUserModelData(userId, modelId);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model
      }
    });
  };
};

export const postUserDataActionCreator = function(userPayload) {
  return async function(dispatch, getState) {
    let user = await postUserData(userPayload);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user
      }
    });
  };
};

export const postModelDataActionCreator = function(userId, modelPayload) {
  return async function(dispatch, getState) {
    let model = await postModelData(userId, modelPayload);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model
      }
    });
  };
};

export const deleteUserDataActionCreator = function(userId) {
  return async function(dispatch, getState) {
    let user = await deleteUserData(userId);
    dispatch({
      type: DELETE_USER_DATA,
      payload: {
        user: user
      }
    });
  };
};

export const deleteModelDataActionCreator = function(userId, modelId) {
  return async function(dispatch, getState) {
    let model = await deleteModelData(userId, modelId);
    dispatch({
      type: DELETE_MODEL_DATA,
      payload: {
        userId: userId,
        model: model
      }
    });
  };
};

export const putUserDataActionCreator = function(userId, userPayload) {
  return async function(dispatch, getState) {
    let user = await putUserData(userId, userPayload);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user
      }
    });
  };
};

export const putModelDataActionCreator = function(
  userId,
  modelId,
  modelPayload
) {
  return async function(dispatch, getState) {
    let model = await putModelData(userId, modelId, modelPayload);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model
      }
    });
  };
};
