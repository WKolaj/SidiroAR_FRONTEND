import {
  ADD_MODEL_DIALOG_HIDE,
  ADD_MODEL_DIALOG_SHOW,
  ADD_MODEL_DIALOG_SWITCH_TO_NEW_MODEL,
  ADD_MODEL_DIALOG_SWITCH_TO_CLONE_MODEL,
} from "../actions/types";

export default function (
  state = { visible: true, userId: null, newModel: true },
  action
) {
  switch (action.type) {
    case ADD_MODEL_DIALOG_SHOW: {
      return {
        ...state,
        visible: true,
        userId: action.payload.userId,
        newModel: true,
      };
    }
    case ADD_MODEL_DIALOG_HIDE: {
      return {
        ...state,
        visible: false,
        userId: null,
      };
    }
    case ADD_MODEL_DIALOG_SWITCH_TO_NEW_MODEL: {
      return {
        ...state,
        newModel: true,
      };
    }
    case ADD_MODEL_DIALOG_SWITCH_TO_CLONE_MODEL: {
      return {
        ...state,
        newModel: false,
      };
    }
    default: {
      return state;
    }
  }
}
