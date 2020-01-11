import {SET_TIMETABLE_FOR_LOCATION} from "../actionTypes";

/* TODO: Remove this reducer! */

const initialState = {
  location: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TIMETABLE_FOR_LOCATION:
      const {locationName, timetable} = action.payload;
      return {...state, location: {...state.location, locationName, timetable}};
    default:
      return state;
  }
}