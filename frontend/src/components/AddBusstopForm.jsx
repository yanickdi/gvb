import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {BehaviorSubject, of} from "rxjs";
import {debounceTime, switchMap, filter, map, tap, catchError} from "rxjs/operators";
import apiService from "../utils/apiService";

class AddBusstopForm extends React.Component {
  state = {
    name: '',
    shownLocations: [],
    loading: false
  };

  constructor(props) {
    super(props);

    this.nameChanges$ = new BehaviorSubject(null);
    this.nameChanges$.asObservable().pipe(
      filter(name => name !== null),
      debounceTime(500),
      tap(() => this.setState({loading: true})),
      switchMap(name => {
        return name !== '' ? apiService.findBusstopAtLocation$(name) : of([])
      }),
      catchError(err => console.log('error:', err)),
      map(result => result.filter(entry => entry.Location && entry.Location.StopPoint).map(entry => entry.Location)),
      map(entry => entry.map(location => ({
        city: location.LocationName.Text,
        stopPointName: location.StopPoint.StopPointName.Text,
        stopPointRef: location.StopPoint.StopPointRef
      })))
    ).subscribe(
      foundLocations => {
        this.setState({shownLocations: foundLocations, loading: false})
      }
    );
  }

  handleNameChange = (ev) => {
    const name = ev.target.value;
    this.setState({name});
    this.nameChanges$.next(name);
  };

  handleBusStopClick = ({stopPointName, city, stopPointRef}) => {
    console.log(stopPointName);
    const payload = {
      locationId: this.props.locationId,
      name: stopPointName,
      city,
      ref: stopPointRef
    };
    apiService.createStopPoint$(payload).subscribe(
      result => {
        console.log('done');
      }
    );
  };

  render() {
    return <div>
      <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
      <div>
        {this.state.loading && <p>Lade...</p>}
        {this.state.shownLocations.map((location, i) => {
          return <p key={i} onClick={() => this.handleBusStopClick(location)}>
            {location.stopPointName}, {location.city}, {location.stopPointRef}
          </p>;
        })}
      </div>
    </div>
  }
}

AddBusstopForm.propTypes = {
  locationId: PropTypes.number.isRequired,
};

export default connect(null, null)(AddBusstopForm);