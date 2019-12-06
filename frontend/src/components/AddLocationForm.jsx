import React from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {stringToSlug} from "../utils/utils";
import InputAdornment from "@material-ui/core/InputAdornment";
import {addLocation} from "../redux/actions";

const prefix = <InputAdornment position="start">{window.location.host}/</InputAdornment>;

class AddLocationForm extends React.Component {
  state = {
    name: '',
    slug: '',
    slugManuallyChanged: false,
    enableSave: false
  };

  nameChange = (e) => {
    const value = e.target.value;

    this.setState({
      name: value,
      slug: this.state.slugManuallyChanged ? this.state.slug : stringToSlug(value),
      enableSave: value.length > 0
    });
  };

  slugChange = (e) => {
    this.setState({slugManuallyChanged: e.target.value.length > 0, slug: e.target.value});
  };

  handleSubmit = (e) => {
    console.log('###');
    e.preventDefault();
    const {addLocation} = this.props;
    const {name, slug} = this.state;
    console.log('blub');

    addLocation({
      name,
      slug
    });
  };

  render() {
    const {name, slug, enableSave} = this.state;

    return <div className='add-location-form'>
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField label="Name des Standortes" variant="outlined"
                   value={name} onChange={this.nameChange}/>
        <TextField label="Url" variant="outlined"
                   value={slug} onChange={this.slugChange}
                   InputProps={{
                     startAdornment: (slug.length > 0 ? prefix : null),
                   }}/>
        <Button variant="contained" color="primary" disabled={!enableSave} type="submit">
          Standort speichern
        </Button>
      </form>
    </div>;
  }
}

const mapStateToProps = (state) => ({});

const actionCreators = {addLocation};

export default connect(mapStateToProps, actionCreators)(AddLocationForm);