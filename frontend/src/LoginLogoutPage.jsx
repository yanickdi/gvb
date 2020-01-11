import React from 'react';
import LoginForm from "./components/LoginForm";
import * as queryString from "query-string";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {logout} from "./redux/actions";

function redirectToTarget(location) {
  let {target} = queryString.parse(location.search);
  target = !!target ? target : '/';
  return <Redirect to={target}/>
}

const LoginLogoutPage = ({token, location, doLogout, logout}) => {
  // do logout
  if (doLogout){
    logout();
    return redirectToTarget(location);
  }
  // do login
  if (!token) return <LoginForm/>;
  // already logged in and browsed to login
  return redirectToTarget(location);
};

export default connect(({user: {token}}) => ({token}), {logout})(LoginLogoutPage);