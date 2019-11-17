import React from 'react';
import {getTimetableFromLocation} from "../redux/actions";
import {connect} from "react-redux";
import Timetable from "../components/Timetable";

class LocationPage extends React.Component {
  state = {};

  componentDidMount() {
    const {locationName} = this.props.match.params;
    const {getTimetableFromLocation} = this.props;

    getTimetableFromLocation(locationName);
  }

  render() {
    const {locationName} = this.props.match.params;
    const {location} = this.props;
    if (Object.entries(location).length === 0) {
      return <div>Loading...</div>;
    }
    return <Timetable showLocation={locationName}/>;
  }
}

const mapStateToProps = state => ({
  location: state.timetable.location
});
const createActions = {getTimetableFromLocation};
export default connect(mapStateToProps, createActions)(LocationPage);