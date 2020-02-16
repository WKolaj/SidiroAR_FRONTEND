import { EDIT_USER_DIALOG_HIDE, EDIT_USER_DIALOG_SHOW } from "../actions/types";

export default function(state = { visible: true, userId: null }, action) {
  switch (action.type) {
    case EDIT_USER_DIALOG_SHOW: {
      return { ...state, visible: true, userId: action.payload.userId };
    }
    case EDIT_USER_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
