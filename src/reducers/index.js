import { combineReducers } from "redux";
import { reducer } from "redux-form";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";
import fileReducer from "./fileReducer";
import busyDialogReducer from "./busyDialog";
import changePasswordDialogReducer from "./changePasswordDialog";
import loginDialogReducer from "./loginDialog";
import userMenuReducer from "./userMenu";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  form: reducer,
  auth: authReducer,
  data: dataReducer,
  file: fileReducer,
  busyDialog: busyDialogReducer,
  loginDialog: loginDialogReducer,
  changePasswordDialog: changePasswordDialogReducer,
  userMenu: userMenuReducer,
  snackbar: snackbarReducer
});
