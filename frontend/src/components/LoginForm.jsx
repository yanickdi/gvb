import React from 'react';
import {connect} from "react-redux";
import {loginSubmit} from "../redux/actions";

class LoginForm extends React.Component {
  state = {
    username: 'admin',
    password: '123456'
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {loginSubmit} = this.props;
    loginSubmit(this.state.username, this.state.password)
  };

  render() {
    const {username, password} = this.state;
    const {authenticationError, token} = this.props;

    if (!!token){
      console.log(this.props);
      return null;
    }
    return (
      <React.Fragment>
        {authenticationError &&
        <div>
          Login fehlgeschlagen
        </div>
        }
        {
          token && <p>Token: {token}</p>
        }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username}
                 onChange={({target: {value}}) => this.setState({username: value})}/>
          <br/>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" value={password}
                 onChange={({target: {value}}) => this.setState({password: value})}/>
          <button>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({user: {token, authenticationError}}) => ({
  token,
  authenticationError
});

const actionCreator = {
  loginSubmit
};

export default connect(mapStateToProps, actionCreator)(LoginForm);