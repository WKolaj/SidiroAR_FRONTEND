import { FETCH_FILE_TO_SEND, SEND_FILE } from "../actions/types";

export default function(
  state = {
    file: null,
    userId: null,
    modelId: null
  },
  action
) {
  switch (action.type) {
    case FETCH_FILE_TO_SEND: {
      return {
        ...state,
        file: action.payload.file,
        userId: action.payload.userId,
        modelId: action.payload.modelId
      };
    }
    case SEND_FILE: {
      return {
        file: null,
        userId: null,
        modelId: null
      };
    }
    default: {
      return state;
    }
  }
}
