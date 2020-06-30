import {
  FETCH_CURRENT_USER_DATA,
  FETCH_ALL_USERS_DATA,
  FETCH_USER_DATA,
  FETCH_USER_MODELS_DATA,
  FETCH_USER_MODEL_DATA,
  DELETE_MODEL_DATA,
  DELETE_USER_DATA,
} from "./types";

import _ from "lodash";

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
  putUserData,
} from "../services/dataService";

import { wrapAsyncActionToHandleError } from "./asyncActionsErrorWrapper";

export const fetchCurrentUserDataActionCreator = function () {
  return async function (dispatch, getState) {
    let currentUser = await getLoggedUserData();
    dispatch({
      type: FETCH_CURRENT_USER_DATA,
      payload: {
        user: currentUser,
      },
    });
  };
};

export const fetchCurrentUserDataActionCreatorWrapped = function () {
  return wrapAsyncActionToHandleError(fetchCurrentUserDataActionCreator());
};

//wrapping this method inside dialog - we have to control wether edition was successful or not
export const putCurrentUserDataActionCreator = function (userPayload) {
  return async function (dispatch, getState) {
    let user = await putLoggedUserData(userPayload);
    dispatch({
      type: FETCH_CURRENT_USER_DATA,
      payload: {
        user: user,
      },
    });
  };
};

export const putCurrentUserDataActionCreatorWrapped = function (userPayload) {
  return wrapAsyncActionToHandleError(
    putCurrentUserDataActionCreator(userPayload)
  );
};

export const fetchAllUsersDataActionCreator = function () {
  return async function (dispatch, getState) {
    let users = await getAllUsersData();
    dispatch({
      type: FETCH_ALL_USERS_DATA,
      payload: {
        users: users,
      },
    });
  };
};

export const fetchAllUsersDataActionCreatorWrapped = function () {
  return wrapAsyncActionToHandleError(fetchAllUsersDataActionCreator());
};

export const fetchUserDataActionCreator = function (id) {
  return async function (dispatch, getState) {
    let user = await getUserData(id);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user,
      },
    });
  };
};

export const fetchUserDataActionCreatorWrapped = function (id) {
  return wrapAsyncActionToHandleError(fetchUserDataActionCreator(id));
};

export const fetchModelsDataActionCreator = function (userId) {
  return async function (dispatch, getState) {
    let models = await getUserModelsData(userId);
    dispatch({
      type: FETCH_USER_MODELS_DATA,
      payload: {
        userId: userId,
        models: models,
      },
    });
  };
};

export const fetchModelsDataActionCreatorWrapped = function (userId) {
  return wrapAsyncActionToHandleError(fetchModelsDataActionCreator(userId));
};

export const fetchModelDataActionCreator = function (userId, modelId) {
  return async function (dispatch, getState) {
    let model = await getUserModelData(userId, modelId);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model,
      },
    });
  };
};

export const fetchModelDataActionCreatorWrapped = function (userId, modelId) {
  return wrapAsyncActionToHandleError(
    fetchModelDataActionCreator(userId, modelId)
  );
};

export const postUserDataActionCreator = function (userPayload) {
  return async function (dispatch, getState) {
    let user = await postUserData(userPayload);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user,
      },
    });
  };
};

export const postUserDataActionCreatorWrapped = function (userPayload) {
  return wrapAsyncActionToHandleError(postUserDataActionCreator(userPayload));
};

export const postModelDataActionCreator = function (userId, modelPayload) {
  return async function (dispatch, getState) {
    let model = await postModelData(userId, modelPayload);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model,
      },
    });
  };
};

export const postModelDataActionCreatorWrapped = function (
  userId,
  modelPayload
) {
  return wrapAsyncActionToHandleError(
    postModelDataActionCreator(userId, modelPayload)
  );
};

export const deleteUserDataActionCreator = function (userId) {
  return async function (dispatch, getState) {
    let user = await deleteUserData(userId);
    dispatch({
      type: DELETE_USER_DATA,
      payload: {
        user: user,
      },
    });
  };
};

export const deleteUserDataActionCreatorWrapped = function (userId) {
  return wrapAsyncActionToHandleError(deleteUserDataActionCreator(userId));
};

export const deleteModelDataActionCreator = function (userId, modelId) {
  return async function (dispatch, getState) {
    let model = await deleteModelData(userId, modelId);
    dispatch({
      type: DELETE_MODEL_DATA,
      payload: {
        userId: userId,
        model: model,
      },
    });
  };
};

export const deleteModelDataActionCreatorWrapped = function (userId, modelId) {
  return wrapAsyncActionToHandleError(
    deleteModelDataActionCreator(userId, modelId)
  );
};

export const putUserDataActionCreator = function (userId, userPayload) {
  return async function (dispatch, getState) {
    let user = await putUserData(userId, userPayload);
    dispatch({
      type: FETCH_USER_DATA,
      payload: {
        user: user,
      },
    });
  };
};

export const putUserDataActionCreatorWrapped = function (userId, userPayload) {
  return wrapAsyncActionToHandleError(
    putUserDataActionCreator(userId, userPayload)
  );
};

export const putModelDataActionCreator = function (
  userId,
  modelId,
  modelPayload
) {
  return async function (dispatch, getState) {
    let model = await putModelData(userId, modelId, modelPayload);
    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: userId,
        model: model,
      },
    });
  };
};

export const putModelDataActionCreatorWrapped = function (
  userId,
  modelId,
  modelPayload
) {
  return wrapAsyncActionToHandleError(
    putModelDataActionCreator(userId, modelId, modelPayload)
  );
};

export const cloneModelActionCreator = function (newUserId, modelId) {
  return async function (dispatch, getState) {
    let { data } = await getState();

    let usersData = data.usersData;

    let usersWithGivenModel = Object.keys(usersData).filter(
      (userId) => modelId in usersData[userId].models && userId !== newUserId
    );

    if (usersWithGivenModel.length <= 0)
      throw new Error(
        `Model ${modelId} not found for any user different than ${newUserId}`
      );

    let firstUserOfModelId = usersWithGivenModel[0];

    let modelPayload = _.pick(
      usersData[firstUserOfModelId].models[modelId],
      "name"
    );

    let extendedModelPayload = {
      ...modelPayload,
      user: [...usersWithGivenModel, newUserId],
    };

    let model = await putModelData(
      usersWithGivenModel[0],
      modelId,
      extendedModelPayload
    );

    dispatch({
      type: FETCH_USER_MODEL_DATA,
      payload: {
        userId: newUserId,
        model: model,
      },
    });
  };
};

export const cloneModelActionCreatorWrapped = function (newUserId, modelId) {
  return wrapAsyncActionToHandleError(
    cloneModelActionCreator(newUserId, modelId)
  );
};
