import apiService from "../utils/apiService";
import {map, switchMap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {
  APP_FAILURE, BUSSTOP_ADDED_TO_LOCATION,
  LOGIN_FAILED_AUTHENTICATION_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOCATION_LIST,
  SET_TIMETABLE_FOR_LOCATION,
  TIMETABLE_FROM_LOCATION_LOADING
} from "./actionTypes";

export const loadLocationList = () => (dispatch) => {
  apiService.loadLocations$().pipe(
    map(locationList => dispatch({type: SET_LOCATION_LIST, payload: locationList}))
  ).subscribe();
};

/**
 * Adds a location and dispatches a reloads locations afterwards
 */
export const addLocation = (createLocationPayload) => (dispatch) => {
  apiService.createLocation$(createLocationPayload).pipe(
    map(result => console.log('new location created')),
    switchMap(() => apiService.loadLocations$()),
    map(locationList => dispatch({type: SET_LOCATION_LIST, payload: locationList}))
  ).subscribe();
};

export function busstopAddedToLocation(locationId) {
  return {type: BUSSTOP_ADDED_TO_LOCATION, payload: locationId};
}

/**
 * Deletes a location and reloads locations afterwards
 * @param locationId
 */
export const deleteLocation = (locationId) => (dispatch) => {
  return apiService.deleteLocation$(locationId).pipe(
    switchMap(() => apiService.loadLocations$()),
    map(locationList => dispatch({type: SET_LOCATION_LIST, payload: locationList}))
  ).subscribe();
};

export const getTimetableFromLocation = (locationName) => (dispatch) => {
  dispatch({type: TIMETABLE_FROM_LOCATION_LOADING});
  apiService.getBusstopsFromLocation(locationName).pipe(
    map(busstopList => {
      const requests$ = busstopList.map(
        busstop => apiService.getBusstopTimetable(busstop)
      );
      return requests$;
    }), switchMap($requests => {
      return forkJoin($requests);
    }), map(
      payloads => [].concat.apply([], payloads)
    ), map(
      payloads => payloads.sort((a, b) => b.time - a.time)
    )
  ).subscribe(
    sortedTimetable => {
      dispatch({
        type: SET_TIMETABLE_FOR_LOCATION, payload: {
          timetable: sortedTimetable,
          locationName: locationName
        }
      })
    }
  );
};

export const loginSubmit = (username, password) => (dispatch) => {
  dispatch({type: LOGIN_START});
  apiService.login(username, password).pipe(
    map(response => {
      const {error, token} = response;
      if (error && error === 'AUTHENTICATION_ERROR') {
        dispatch({type: LOGIN_FAILED_AUTHENTICATION_ERROR});
      } else if (!!token) {
        dispatch({type: LOGIN_SUCCESS, payload: {token}})
      } else {
        dispatch({type: APP_FAILURE});
      }
    })
  ).subscribe();
};

export const logout = () => ({type: LOGOUT_SUCCESS});