import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadLocationList} from "../redux/actions";
import AddLocationForm from "./AddLocationForm";

const LocationManagement = ({locations, loadLocationList}) => {
  useEffect(() => {
    loadLocationList();
  }, [loadLocationList]);

  return <div>
    {!locations && <p>Lade gespeicherte Standorte...</p>}
    {
      !!locations &&
      <ul>
        {locations.map(location =>
          <li key={location.id}>{location.name}</li>
        )}
      </ul>
    }
    <AddLocationForm />
  </div>
};

const mapStateToProps = ({admin: {locations}}) => ({
  locations: locations
});

const actionCreators = {loadLocationList};

export default connect(mapStateToProps, actionCreators)(LocationManagement);