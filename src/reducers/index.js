import { combineReducers } from "redux";
import { reducer } from "redux-form";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  form: reducer,
  auth: authReducer,
  data: dataReducer
});
