import apiService from "../utils/apiService";
import {map, switchMap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {
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
        payloads => payloads.sort((a, b) => a.time - b.time)
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