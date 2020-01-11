import {BUSSTOP_ADDED_TO_LOCATION, SET_LOCATION_LIST} from "../actionTypes";


const initialState = {
  locations: null,
  locationLastChanged: {} // holds timestamps of last changes of locations (e.g. Busstop added or removed)
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BUSSTOP_ADDED_TO_LOCATION:
      const locationId = action.payload;
      return {
        ...state,
        locationLastChanged: {
          ...state.locationLastChanged,
          [locationId]: new Date().valueOf()
        }
      };
    case SET_LOCATION_LIST:
      const locations = action.payload;
      return {...state, locations};
    default:
      return state;
  }
}