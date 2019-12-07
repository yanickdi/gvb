import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {deleteLocation, loadLocationList} from "../redux/actions";
import AddLocationForm from "./AddLocationForm";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";

const LocationManagement = ({locations, loadLocationList, deleteLocation}) => {
  useEffect(() => {
    loadLocationList();
  }, [loadLocationList]);

  return <div className="location-management">
    {!locations && <p>Lade gespeicherte Standorte...</p>}
    {
      !!locations &&
      <div className="location-list">
        {locations.map(location =>
          <ExpansionPanel key={location.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}>
              {location.name}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              Link: <Link to={`/${location.slug}`}>/{location.slug}</Link>
              <button onClick={() => deleteLocation(location.id)}>Standort löschen</button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    }
    <h4>Standort hinzufügen</h4>
    <AddLocationForm/>
  </div>
};

const mapStateToProps = ({admin: {locations}}) => ({
  locations: locations
});

const actionCreators = {loadLocationList, deleteLocation};

export default connect(mapStateToProps, actionCreators)(LocationManagement);