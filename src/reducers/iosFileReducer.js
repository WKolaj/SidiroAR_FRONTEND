import { FETCH_IOS_FILE_TO_SEND, SEND_IOS_FILE } from "../actions/types";

export default function(
  state = {
    file: null,
    userId: null,
    modelId: null
  },
  action
) {
  switch (action.type) {
    case FETCH_IOS_FILE_TO_SEND: {
      return {
        ...state,
        file: action.payload.file,
        userId: action.payload.userId,
        modelId: action.payload.modelId
      };
    }
    case SEND_IOS_FILE: {
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
