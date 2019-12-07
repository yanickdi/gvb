import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {deleteLocation, loadLocationList} from "../redux/actions";
import AddLocationForm from "./AddLocationForm";

const LocationManagement = ({locations, loadLocationList, deleteLocation}) => {
  useEffect(() => {
    loadLocationList();
  }, [loadLocationList]);

  return <div>
    {!locations && <p>Lade gespeicherte Standorte...</p>}
    {
      !!locations &&
      <ul>
        {locations.map(location =>
          <li key={location.id}>{location.name} (<button onClick={() => deleteLocation(location.id)}>x</button>)</li>
        )}
      </ul>
    }
    <AddLocationForm />
  </div>
};

const mapStateToProps = ({admin: {locations}}) => ({
  locations
});

const actionCreators = {loadLocationList, deleteLocation};

export default connect(mapStateToProps, actionCreators)(LocationManagement);