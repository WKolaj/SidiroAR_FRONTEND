import { USER_MENU_HIDE, USER_MENU_SHOW } from "../actions/types";

export default function(state = { visible: false }, action) {
  switch (action.type) {
    case USER_MENU_SHOW: {
      return { ...state, visible: true };
    }
    case USER_MENU_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
