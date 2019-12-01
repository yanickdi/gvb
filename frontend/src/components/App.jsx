import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import LoginLogoutPage from "../LoginLogoutPage";
import AdminPage from "../AdminPage";
import PrivateRoute from "./PrivateRoute";

function App(props) {
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route path="/location/:locationName" component={LocationPage} />
          <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
          <Route path="/login" component={LoginLogoutPage}></Route>
          <Route path="/logout" render={props => <LoginLogoutPage doLogout {...props}/>}></Route>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
