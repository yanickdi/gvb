import React, {useEffect, useState} from "react";
import apiService from "../utils/apiService";

const BusStopList = ({locationId}) => {
  const [stops, setStops] = useState(null);
  useEffect( () => {
    apiService.getStopPointsOfLocation$(locationId).subscribe(
      result => setStops(result)
    );
  }, [locationId]);

  return stops ? stops.map(busstop => {
    return <div key={busstop.id}>{busstop.name}, {busstop.city}</div>;
    }) : <p>loading...</p>;
};

export default BusStopList;