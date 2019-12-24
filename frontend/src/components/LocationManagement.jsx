import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {deleteLocation, loadLocationList} from "../redux/actions";
import AddLocationForm from "./AddLocationForm";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import AddBusstopForm from "./AddBusstopForm";
import BusStopList from "./BusStopList";

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
          <ExpansionPanel key={location.id} expanded>
            <ExpansionPanelSummary className="location-summary"
                                   expandIcon={<ExpandMoreIcon/>}>
              {location.name}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="location-detail">
              Link: <Link to={`/${location.slug}`}>/{location.slug}</Link>
              <button onClick={() => deleteLocation(location.id)}>Standort löschen</button>
              <div>
                Haltestellen:
                <BusStopList locationId={location.id}/>
              </div>
              <div>
                Haltestelle hinzufügen:
                <AddBusstopForm locationId={location.id}/>
              </div>
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