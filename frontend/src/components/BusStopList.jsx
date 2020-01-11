import React from "react";
import apiService from "../utils/apiService";
import {connect} from "react-redux";
import {busstopAddedToLocation} from "../redux/actions";

class BusStopList extends React.Component {

  state = {
    stops: null,
    isFetching: false
  };

  componentDidMount() {
    this.doUpdate();
  }

  doUpdate() {
    // ok, do update:
    this.setState({isFetching: true});

    apiService.getStopPointsOfLocation$(this.props.locationId).subscribe(
      stops => this.setState({stops, isFetching: false})
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.lastChanged > prevProps.lastChanged) {
      this.doUpdate();
    }
  }

  handleDeleteBusStop(busStopId) {
    apiService.deleteStopPoint$(busStopId).subscribe(
      ok => {
        this.props.busstopAddedToLocation(this.props.locationId);
      }
    );
  }

  render() {
    const {stops} = this.state;

    return stops ? stops.map(busstop => {
      return (
        <div key={busstop.id}>{busstop.name}, {busstop.city}
          <span
            style={({color: 'red', cursor: 'pointer'})}
            onClick={() => this.handleDeleteBusStop(busstop.id)}>(x)
        </span>
        </div>);
    }) : <p>loading...</p>;
  }
}

function selectLastChange(adminState, locationId) {
  const lastChange = adminState.locationLastChanged[locationId];
  return !!lastChange ? lastChange : -1;
}


const mapStateToProps = ({admin}, ownProps) => ({
  lastChanged: selectLastChange(admin, ownProps.locationId)
});

export default connect(mapStateToProps, {busstopAddedToLocation})(BusStopList);