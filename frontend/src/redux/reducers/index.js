import { combineReducers } from "redux";
import timetable from "./timetableReducer";
import user from "./userReducer";
import admin from "./adminReducer";

export default combineReducers({timetable, user, admin});
