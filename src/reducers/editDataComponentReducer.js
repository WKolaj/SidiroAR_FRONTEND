import {
  EDIT_DATA_COMPONENT_SELECT_USER,
  EDIT_DATA_COMPONENT_CHANGE_FILTER,
  EDIT_DATA_COMPONENT_RESET,
} from "../actions/types";

export default function (
  state = {
    selectedUser: "",
    filter: "",
    possibleUsers: [],
  },
  action
) {
  switch (action.type) {
    case EDIT_DATA_COMPONENT_RESET: {
      return {
        ...state,
        selectedUser: "",
        filter: "",
      };
    }
    case EDIT_DATA_COMPONENT_SELECT_USER: {
      return {
        ...state,
        selectedUser: action.payload.selectedUser,
      };
    }
    case EDIT_DATA_COMPONENT_CHANGE_FILTER: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }
    default: {
      return state;
    }
  }
}
