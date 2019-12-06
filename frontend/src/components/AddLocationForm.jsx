import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadLocationList} from "../redux/actions";

const AddLocationForm = ({}) => {
  useEffect(() => {
  }, []);

  return <div>AddLocationForm</div>;
};

const mapStateToProps = (state) => ({
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(AddLocationForm);