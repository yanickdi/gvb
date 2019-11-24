import React from 'react';
import {getTimetableFromLocation} from "../redux/actions";
import {connect} from "react-redux";

class Timetable extends React.Component {
  render() {
    const {location} = this.props;
    if (!location.locationName) return <p>Not loaded yet</p>;

    return <table>
      <thead>
      <tr>
        <th>Stop</th>
        <th>Line</th>
        <th>Dest</th>
        <th>Time</th>
      </tr>

      </thead>
      <tbody>{location.timetable.map((entry, i) => {

          return <tr key={i}>
            <td>{entry.stop}</td>
            <td>{entry.line}</td>
            <td>{entry.dest}</td>
            <td>{entry.time}</td>
          </tr>
        }
      )}</tbody>

    </table>;
  }
}

const mapStateToProps = state => ({
  location: state.timetable.location
});
const createActions = {getTimetableFromLocation};
export default connect(mapStateToProps, createActions)(Timetable);