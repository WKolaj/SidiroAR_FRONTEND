import {
  FETCH_CURRENT_USER_DATA,
  FETCH_ALL_USERS_DATA,
  FETCH_USER_DATA,
  FETCH_USER_MODELS_DATA,
  FETCH_USER_MODEL_DATA
} from "./types";

import {
  getLoggedUserData,
  getAllUsersData,
  getUserData,
  getUserModelsData,
  getUserModelData
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
