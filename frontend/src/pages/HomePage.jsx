import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ENVIRONMENT} from "../utils/environment";

class HomePage extends React.Component {

  render(){
    return <div>{ENVIRONMENT}
      <ul>
        <li><Link to="/location/uni">Uni</Link></li>
      </ul>
    </div>;
  }
}

const mapStateToProps = null;
const createActions = null;
export default connect(mapStateToProps, createActions)(HomePage);