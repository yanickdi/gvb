import { combineReducers } from "redux";
import timetable from "./timetableReducer";
import user from "./userReducer";

export default combineReducers({timetable, user});
