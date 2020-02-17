import {
  EDIT_MODEL_DIALOG_HIDE,
  EDIT_MODEL_DIALOG_SHOW
} from "../actions/types";

export default function(
  state = { visible: true, userId: null, modelId: null },
  action
) {
  switch (action.type) {
    case EDIT_MODEL_DIALOG_SHOW: {
      return {
        ...state,
        visible: true,
        userId: action.payload.userId,
        modelId: action.payload.modelId
      };
    }
    case EDIT_MODEL_DIALOG_HIDE: {
      return { ...state, visible: false };
    }
    default: {
      return state;
    }
  }
}
