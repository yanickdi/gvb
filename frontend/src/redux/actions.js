import apiService from "../utils/apiService";

export function getTimetableFromLocation(locationName){
 return (dispatch) => {
  apiService.fetch('GET', '/location/' + locationName).subscribe(
    ok => {
     console.log(ok);
    }
  );
 }
}