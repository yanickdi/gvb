import React from 'react';
import {getTimetableFromLocation} from "../redux/actions";
import {connect} from "react-redux";

class Timetable extends React.Component {
  render() {
    const {location} = this.props;
    if (!location.locationName) return <p>Not loaded yet</p>;

    return <table>
      <tbody>{location.timetable.map((entry, i) =>
        <tr key={i}>
          <td>Linie {entry.line}</td>
          <td>{entry.time}</td>
        </tr>
      )}</tbody>

    </table>;
  }
}

const mapStateToProps = state => ({
  location: state.timetable.location
});
const createActions = {getTimetableFromLocation};
export default connect(mapStateToProps, createActions)(Timetable);