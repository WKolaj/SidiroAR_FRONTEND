import { LOGIN_DIALOG_HIDE, LOGIN_DIALOG_SHOW } from "../actions/types";

export default function(state = { visible: false }, action) {
  switch (action.type) {
    case LOGIN_DIALOG_SHOW: {
      return { ...state, visible: true };
    }
    case LOGIN_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
