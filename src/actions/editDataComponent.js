import {
  EDIT_DATA_COMPONENT_SELECT_USER,
  EDIT_DATA_COMPONENT_CHANGE_FILTER,
  EDIT_DATA_COMPONENT_RESET,
} from "./types";
import { existsAndIsNotEmpty, exists } from "../utilities/utilities";

const convertUserDataToRowsToDisplay = (user) => {
  if (!existsAndIsNotEmpty(user.models)) return [];

  let usersModels = Object.values(user.models);

  return usersModels.map((model) => {
    return {
      userId: user._id,
      userEmail: user.email,
      modelId: model._id,
      modelName: model.name,
      modelFileExists: model.fileExists,
      modelIOSFileExists: model.iosFileExists,
    };
  });
};

export const convertUsersDataToDataToDisplay = (selectedUserId, usersData) => {
  //Returning empty array if usersData is empty
  if (!existsAndIsNotEmpty(usersData)) return [];

  //User not selected - return empty array
  if (!exists(selectedUserId) || selectedUserId === "") return [];

  //User selected - return only data for selected user
  let user = usersData[selectedUserId];

  //Returning empty array if selected User does not exist in data
  if (!existsAndIsNotEmpty(user)) return [];

  return convertUserDataToRowsToDisplay(user);
};

export const doesUsersEmailFitsFilter = (email, filter) => {
  if (!exists(email)) return false;
  if (!exists(filter) || filter === "") return true;

  return email.toLowerCase().includes(filter.toLowerCase(), 0);
};

export const changeFilterActionCreator = function (filter) {
  return async function (dispatch, getState) {
    let state = await getState();

    //if user is selected - checking if should be cleared before changing filter
    if (
      exists(state.editDataComponent.selectedUser) &&
      state.editDataComponent.selectedUser !== ""
    ) {
      let userEmail =
        state.data.usersData[state.editDataComponent.selectedUser].email;

      //Clearing user selection if selected user does not fit to filter
      if (!doesUsersEmailFitsFilter(userEmail, filter))
        await dispatch(selectUserActionCreator(""));
    }

    await dispatch({
      payload: { filter: filter },
      type: EDIT_DATA_COMPONENT_CHANGE_FILTER,
    });
  };
};

export const selectUserActionCreator = function (userId) {
  return async function (dispatch, getState) {
    await dispatch({
      payload: { selectedUser: userId },
      type: EDIT_DATA_COMPONENT_SELECT_USER,
    });
  };
};

export const resetActionCreator = function () {
  return async function (dispatch, getState) {
    await dispatch({
      type: EDIT_DATA_COMPONENT_RESET,
    });
  };
};
