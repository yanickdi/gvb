import {of} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {API_URL} from "./environment";
import {fromFetch} from "rxjs/fetch";

const apiService = {};

apiService.fetch = (method, path, payload = null) => {
  const body = method !== 'GET' ? JSON.stringify(payload) : null;
  const url = new URL(API_URL + path);
  if (method === 'GET' && payload) {
    Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
  }
  return fromFetch(url, {
    method: method,
    headers: {"Content-Type": "application/json"},
    body: body
  }).pipe(
    switchMap(response => {
      if (response.ok) {
        // OK return data
        return response.json();
      } else {
        // Server is returning a status requiring the client to try something else.
        return of({error: true, message: `Error ${response.status}`});
      }
    }),
    catchError(err => {
      // Network or other error, handle appropriately
      console.error(err);
      return of({error: true, message: err.message})
    })
  );
};

// TODO: remove this method!!
apiService.getBusstopTimetable = (busstop) => {
  return apiService.fetch('GET', `/busstop/${busstop}`);
};

apiService.loadLocations$ = () => {
  return apiService.fetch('GET', '/locations');
};

apiService.getTimeTableForLocationSlug = (slug) => {
  return apiService.fetch('GET', `/location/slug/${slug}/timetable`);
};

apiService.createLocation$ = (payload) => {
  return apiService.fetch('POST', '/location', payload);
};

apiService.createStopPoint$ = ({locationId, ...payload}) => {
  return apiService.fetch('POST', `/location/id/${locationId}/stopPoint`, payload);
};

apiService.getStopPointsOfLocation$ = (locationId) => {
  return apiService.fetch('GET', `/location/id/${locationId}/stopPoints`);
};

apiService.deleteStopPoint$ = (stopPointId) => {
  return apiService.fetch('DELETE', `/stopPoint/id/${stopPointId}`);
};

apiService.findBusstopAtLocation$ = (locationName) => {
  return apiService.fetch('GET', '/proxy/location-information-request', {location_name: locationName});
};

apiService.deleteLocation$ = (locationId) => {
  return apiService.fetch('DELETE', `/location/id/${locationId}`);
};

apiService.login = (username, password) => {
  return apiService.fetch('POST', '/login', {username, password})
};

export default apiService;