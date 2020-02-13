import { MAIN_MENU_SHOW, MAIN_MENU_HIDE } from "../actions/types";

export default function(state = { visible: false }, action) {
  switch (action.type) {
    case MAIN_MENU_SHOW: {
      return { ...state, visible: true };
    }
    case MAIN_MENU_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
