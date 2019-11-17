import React from 'react';
import {getTimetableFromLocation} from "../redux/actions";
import {connect} from "react-redux";

class LocationPage extends React.Component {
  state = {};

  componentDidMount() {
    const {locationName} = this.props.match.params;
    const {getTimetableFromLocation} = this.props;

    getTimetableFromLocation(locationName);
  }

  render() {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = null;
const createActions = {getTimetableFromLocation};
export default connect(mapStateToProps, createActions)(LocationPage);