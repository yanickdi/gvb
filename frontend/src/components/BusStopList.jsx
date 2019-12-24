import React from "react";
import apiService from "../utils/apiService";

class BusStopList extends React.Component {

  state = {
    stops: null
  };

  componentDidMount() {
    const {locationId} = this.props;
    apiService.getStopPointsOfLocation$(locationId).subscribe(
      stops => this.setState({stops})
    );
  }

  render() {
    const {stops} = this.state;

    return stops ? stops.map(busstop => {
      return <div key={busstop.id}>{busstop.name}, {busstop.city}</div>;
    }) : <p>loading...</p>;
  }
}

export default BusStopList;