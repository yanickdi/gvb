import {SET_LOCATION_LIST} from "../actionTypes";

const initialState = {
  locations: null
};

export default function (state = initialState, action){
  switch (action.type){
    case SET_LOCATION_LIST:
      const locations = action.payload;
      return {...state, locations};
    default:
      return state;
  }
}