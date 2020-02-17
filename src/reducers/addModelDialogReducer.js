import { ADD_MODEL_DIALOG_HIDE, ADD_MODEL_DIALOG_SHOW } from "../actions/types";

export default function(state = { visible: true, userId: null }, action) {
  switch (action.type) {
    case ADD_MODEL_DIALOG_SHOW: {
      return {
        ...state,
        visible: true,
        userId: action.payload.userId
      };
    }
    case ADD_MODEL_DIALOG_HIDE: {
      return {
        ...state,
        visible: false,
        userId: null
      };
    }
    default: {
      return state;
    }
  }
}
