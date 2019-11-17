import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Provider from "react-redux/lib/components/Provider";
import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";

function App(props) {
  return (
    <Provider store={props.store}>
      <Router>
        <Switch>
          <Route path="/location"><LocationPage /></Route>
          <Route path="/"><HomePage /></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
