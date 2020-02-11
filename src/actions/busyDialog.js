import { BUSY_DIALOG_WINDOW_SHOW, BUSY_DIALOG_WINDOW_HIDE } from "./types";

export const showBusyDialogWindowActionCreator = function() {
  return {
    type: BUSY_DIALOG_WINDOW_SHOW
  };
};

export const hideBusyDialogWindowActionCreator = function() {
  return {
    type: BUSY_DIALOG_WINDOW_HIDE
  };
};
