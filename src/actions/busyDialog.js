import { BUSY_DIALOG_SHOW, BUSY_DIALOG_HIDE } from "./types";

export const showBusyDialogActionCreator = function() {
  return {
    type: BUSY_DIALOG_SHOW
  };
};

export const hideBusyDialogActionCreator = function() {
  return {
    type: BUSY_DIALOG_HIDE
  };
};
