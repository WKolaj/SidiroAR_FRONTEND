import {
  FETCH_CURRENT_USER_DATA,
  FETCH_ALL_USERS_DATA,
  FETCH_USER_DATA,
  FETCH_USER_MODELS_DATA,
  FETCH_USER_MODEL_DATA,
  DELETE_MODEL_DATA,
  DELETE_USER_DATA,
} from "../actions/types";

export default function (
  state = { usersData: {}, currentUserData: null },
  action
) {
  switch (action.type) {
    case FETCH_CURRENT_USER_DATA: {
      return { ...state, currentUserData: action.payload.user };
    }
    case FETCH_ALL_USERS_DATA: {
      return { ...state, usersData: action.payload.users };
    }
    case FETCH_USER_DATA: {
      return {
        ...state,
        usersData: {
          ...state.usersData,
          [action.payload.user._id]: action.payload.user,
        },
      };
    }
    case FETCH_USER_MODELS_DATA: {
      let userId = action.payload.userId;
      let modelsData = action.payload.models;

      return {
        ...state,
        usersData: {
          ...state.usersData,
          [userId]: { ...state.usersData[userId], models: modelsData },
        },
      };
    }
    case FETCH_USER_MODEL_DATA: {
      let userId = action.payload.userId;
      let modelData = action.payload.model;

      let newState = {
        ...state,
        usersData: {
          ...state.usersData,
          [userId]: {
            ...state.usersData[userId],
            models: {
              ...state.usersData[userId].models,
              [modelData._id]: modelData,
            },
          },
        },
      };

      //updating also other users with given model
      let usersWithGivenModel = Object.values(state.usersData).filter(
        (user) => modelData._id in user.models && user._id !== userId
      );

      for (let userData of usersWithGivenModel) {
        newState.usersData[userData._id].models[modelData._id] = modelData;
      }

      return newState;
    }
    case DELETE_USER_DATA: {
      let newUserData = { ...state.usersData };
      delete newUserData[action.payload.user._id];

      return {
        ...state,
        usersData: newUserData,
      };
    }
    case DELETE_MODEL_DATA: {
      let userId = action.payload.userId;
      let modelData = action.payload.model;
      let newModels = {
        ...state.usersData[userId].models,
      };
      delete newModels[modelData._id];

      return {
        ...state,
        usersData: {
          ...state.usersData,
          [userId]: {
            ...state.usersData[userId],
            models: newModels,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
