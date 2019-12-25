import React from 'react';
import {connect} from "react-redux";
import apiService from "../utils/apiService";

class Timetable extends React.Component {
  state = {
    slug: null,
    isFetching: false,
    timeTable: null
  };

  componentDidMount() {
    const {location} = this.props;
    const slug = location.pathname.slice(1);
    this.setState({slug, isFetching: true});
    apiService.getTimeTableForLocationSlug(slug).subscribe(
      result => {
        console.log('## alright');
        console.log(result);
        this.setState({
          isFetching: false,
          timeTable: result
        });
      }
    );
  }

  render() {
    const {isFetching} = this.state;
    return isFetching ? <p>Loading...</p> : <p>alrighty then</p>
    // if (!location.locationName) return <p>Not loaded yet</p>;

    // return <table>
    //   <thead>
    //   <tr>
    //     <th>Stop</th>
    //     <th>Line</th>
    //     <th>Dest</th>
    //     <th>Time</th>
    //   </tr>
    //
    //   </thead>
    //   <tbody>{location.timetable.map((entry, i) => {
    //
    //       return <tr key={i}>
    //         <td>{entry.stop}</td>
    //         <td>{entry.line}</td>
    //         <td>{entry.dest}</td>
    //         <td>{entry.time}</td>
    //       </tr>
    //     }
    //   )}</tbody>
    //
    // </table>;
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, null)(Timetable);