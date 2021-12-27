import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { getprojects, addproject, joinproject, getcolabreqs } from "./data";

export default combineReducers({
  auth,
  message,
  getprojects,
  addproject,
  joinproject,
  getcolabreqs,
});
