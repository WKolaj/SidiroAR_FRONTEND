import { BUSY_DIALOG_SHOW, BUSY_DIALOG_HIDE } from "../actions/types";

export default function(state = { visible: false }, action) {
  switch (action.type) {
    case BUSY_DIALOG_SHOW: {
      return { ...state, visible: true };
    }
    case BUSY_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
