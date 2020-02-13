import { MAIN_MENU_HIDE, MAIN_MENU_SHOW } from "./types";

export const showMainMenuActionCreator = function() {
  return {
    type: MAIN_MENU_SHOW
  };
};

export const hideMainMenuActionCreator = function() {
  return {
    type: MAIN_MENU_HIDE
  };
};
