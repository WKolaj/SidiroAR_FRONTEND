import { LOGIN_USER, LOGIN_USER_WITH_JWT, LOGOUT_USER } from "../actions/types";

export default function(state = { currentUser: null }, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, currentUser: action.payload.user };
    }
    case LOGIN_USER_WITH_JWT: {
      return { ...state, currentUser: action.payload.user };
    }
    case LOGOUT_USER: {
      return { ...state, currentUser: null };
    }
    default: {
      return state;
    }
  }
}
