import {
  REMOVE_USER_DIALOG_HIDE,
  REMOVE_USER_DIALOG_SHOW
} from "../actions/types";

export default function(state = { visible: true, userId: null }, action) {
  switch (action.type) {
    case REMOVE_USER_DIALOG_SHOW: {
      return { ...state, visible: true, userId: action.payload.userId };
    }
    case REMOVE_USER_DIALOG_HIDE: {
      return { ...state, visible: false, userId: null };
    }
    default: {
      return state;
    }
  }
}
