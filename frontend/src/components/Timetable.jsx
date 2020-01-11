import React from 'react';
import {connect} from "react-redux";
import apiService from "../utils/apiService";

class Timetable extends React.Component {
  state = {
    slug: null,
    isFetching: true,
    timeTable: null
  };

  componentDidMount() {
    const {location} = this.props;
    const slug = location.pathname.slice(1);
    apiService.getTimeTableForLocationSlug(slug).subscribe(
      result => {
        this.setState({
          isFetching: false,
          timeTable: result
        });
      }
    );
  }

  render() {
    const {isFetching, timeTable} = this.state;
    return isFetching ? <p>Loading...</p> : (
      <table className="timetable" style={({width: '100%'})}>
        <thead>
        <tr>
          <th>Stop</th>
          <th>Linie</th>
          <th>Dest</th>
          <th>Time</th>
        </tr>
        </thead>
        <tbody>
        {timeTable.map((entry, i) =>
          <tr key={i}>
            <td>{entry.stop_point_name}</td>
            <td>{entry.mode} {entry.line}</td>
            <td>{entry.destination}</td>
            <td>{entry.departure}</td>
          </tr>
        )}
        </tbody>
      </table>);
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, null)(Timetable);