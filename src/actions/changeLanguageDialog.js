import {
  CHANGE_LANGUAGE_DIALOG_HIDE,
  CHANGE_LANGUAGE_DIALOG_SHOW,
} from "./types";

export const showChangeLanguageDialogActionCreator = function () {
  return {
    type: CHANGE_LANGUAGE_DIALOG_SHOW,
  };
};

export const hideChangeLanguageDialogActionCreator = function () {
  return {
    type: CHANGE_LANGUAGE_DIALOG_HIDE,
  };
};
