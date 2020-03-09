import { combineReducers } from "redux";
import { reducer } from "redux-form";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";
import fileReducer from "./fileReducer";
import iosFileReducer from "./iosFileReducer";
import busyDialogReducer from "./busyDialog";
import changePasswordDialogReducer from "./changePasswordDialog";
import loginDialogReducer from "./loginDialog";
import userMenuReducer from "./userMenu";
import mainMenuReducer from "./mainMenu";
import addUserDialogReducer from "./addUserDialogReducer";
import editUserDialogReducer from "./editUserDialogReducer";
import removeUserDialogReducer from "./removeUserDialogReducer";
import addModelDialogReducer from "./addModelDialogReducer";
import removeModelDialogReducer from "./removeModelDialogReducer";
import editModelDialogReducer from "./editModelDialogReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  form: reducer,
  auth: authReducer,
  data: dataReducer,
  file: fileReducer,
  iosFile: iosFileReducer,
  busyDialog: busyDialogReducer,
  loginDialog: loginDialogReducer,
  changePasswordDialog: changePasswordDialogReducer,
  addUserDialog: addUserDialogReducer,
  editUserDialog: editUserDialogReducer,
  removeUserDialog: removeUserDialogReducer,
  removeModelDialog: removeModelDialogReducer,
  addModelDialog: addModelDialogReducer,
  editModelDialog: editModelDialogReducer,
  userMenu: userMenuReducer,
  mainMenu: mainMenuReducer,
  snackbar: snackbarReducer
});
