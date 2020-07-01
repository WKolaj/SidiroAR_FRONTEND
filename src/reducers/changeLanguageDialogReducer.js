import {
  CHANGE_LANGUAGE_DIALOG_HIDE,
  CHANGE_LANGUAGE_DIALOG_SHOW,
} from "../actions/types";

export default function (state = { visible: false }, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE_DIALOG_SHOW: {
      return { ...state, visible: true };
    }
    case CHANGE_LANGUAGE_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
