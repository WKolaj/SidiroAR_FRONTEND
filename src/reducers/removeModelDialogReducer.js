import {
  REMOVE_MODEL_DIALOG_SHOW,
  REMOVE_MODEL_DIALOG_HIDE
} from "../actions/types";

export default function(
  state = { visible: true, userId: null, modelId: null },
  action
) {
  switch (action.type) {
    case REMOVE_MODEL_DIALOG_SHOW: {
      return {
        ...state,
        visible: true,
        userId: action.payload.userId,
        modelId: action.payload.modelId
      };
    }
    case REMOVE_MODEL_DIALOG_HIDE: {
      return { ...state, visible: false, userId: null, modelId: null };
    }
    default: {
      return state;
    }
  }
}
