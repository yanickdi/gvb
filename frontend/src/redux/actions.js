import apiService from "../utils/apiService";
import {map, switchMap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {
  APP_FAILURE,
  LOGIN_FAILED_AUTHENTICATION_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  SET_TIMETABLE_FOR_LOCATION,
  TIMETABLE_FROM_LOCATION_LOADING
} from "./actionTypes";

export function getTimetableFromLocation(locationName) {
  return (dispatch) => {
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
  }
}

export function loginSubmit(username, password) {
  return (dispatch) => {
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
    ).subscribe(
    );
  }
}