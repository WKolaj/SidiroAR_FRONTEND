import { ADD_USER_DIALOG_HIDE, ADD_USER_DIALOG_SHOW } from "../actions/types";

export default function(state = { visible: true }, action) {
  switch (action.type) {
    case ADD_USER_DIALOG_SHOW: {
      return { ...state, visible: true };
    }
    case ADD_USER_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
