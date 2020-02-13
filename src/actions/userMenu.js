import { USER_MENU_HIDE, USER_MENU_SHOW } from "./types";

export const showUserMenuActionCreator = function() {
  return {
    type: USER_MENU_SHOW
  };
};

export const hideUserMenuActionCreator = function() {
  return {
    type: USER_MENU_HIDE
  };
};
