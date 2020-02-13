import {
  CHANGE_PASSWORD_DIALOG__HIDE,
  CHANGE_PASSWORD_DIALOG_SHOW
} from "../actions/types";

export default function(state = { visible: false }, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_DIALOG_SHOW: {
      return { ...state, visible: true };
    }
    case CHANGE_PASSWORD_DIALOG__HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
