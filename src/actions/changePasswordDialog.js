import {
  CHANGE_PASSWORD_DIALOG_SHOW,
  CHANGE_PASSWORD_DIALOG__HIDE
} from "./types";
import { existsAndIsNotEmpty } from "../utilities/utilities";
import {
  fetchCurrentUserDataActionCreatorWrapped,
  putCurrentUserDataActionCreator
} from "./data";
import {
  showBusyDialogActionCreator,
  hideBusyDialogActionCreator
} from "./busyDialog";
import { enqueueSnackbar } from "./snackbar";
import _ from "lodash";
import { reset } from "redux-form";

export const showChangePasswordDialogActionCreator = function() {
  return async function(dispatch, getState) {
    //Fetching data of current user
    await dispatch(fetchCurrentUserDataActionCreatorWrapped());

    let state = await getState();

    //Showing user dialog only if data to form has been fetched
    if (existsAndIsNotEmpty(state.data.currentUserData)) {
      await dispatch({
        type: CHANGE_PASSWORD_DIALOG_SHOW
      });
    }
  };
};

export const hideChangePasswordDialogActionCreator = function() {
  return async function(dispatch, getState) {
    await dispatch(reset("changePasswordDialog"));
    await dispatch({
      type: CHANGE_PASSWORD_DIALOG__HIDE
    });
  };
};

export const changePasswordActionCreator = function(newPassword, oldPassword) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());

      let state = await getState();

      //Showing user dialog only if data to form has been fetched
      if (existsAndIsNotEmpty(state.data.currentUserData)) {
        let editPayload = _.pick(
          state.data.currentUserData,
          "name",
          "email",
          "permissions"
        );

        editPayload.password = newPassword;
        editPayload.oldPassword = oldPassword;

        await dispatch(putCurrentUserDataActionCreator(editPayload));

        await dispatch(hideChangePasswordDialogActionCreator());
      }
    } catch (err) {
      console.log(err);

      let errorMessage = "Niewłaściwe nowe lub stare hasło";

      await dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" }
        })
      );
    } finally {
      await dispatch(hideBusyDialogActionCreator());
    }
  };
};
