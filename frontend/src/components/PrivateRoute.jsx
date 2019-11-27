import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component, token, path, ...options}) => {
  return !!token ? <Route {...options} component={component}/> :
    <Redirect to={`/login?target=${path}`}></Redirect>;
};

const mapStateToProps = ({user: {token}}) => ({
  token
});

export default connect(mapStateToProps, null)(PrivateRoute);