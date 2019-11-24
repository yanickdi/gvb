import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import LoginPage from "../LoginPage";

function App(props) {
  return (
      <Router>
        <Switch>
          <Route path="/location/:locationName" component={LocationPage} />
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
  );
}

export default App;
