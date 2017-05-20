import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import {hashPassword, compareHash} from '../../server/hashUtils.js';
import $ from 'jquery';
// import LoginForm from './LoginForm.jsx';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component{
  constructor(props){
  super(props);  
  
  this.state = {
      email: "",
      password: ""
  };

  this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  this.handleUsernameInput = this.handleUsernameInput.bind(this);
  this.handlePasswordInput = this.handlePasswordInput.bind(this);

  }

  handleLoginSubmit(e){
    e.preventDefault();
    var enteredPassword = this.state.password;
    $.ajax({
      url: '/loginCheck',
      type: 'POST',
      data: this.state,
      context: this,
      success: function(data) {
        if (data.length < 1) {
          alert('Invalid username. If you have not registered yet, please click the sign-up tab to create an account');
          return;
        }
        var oldPassword = data[0].password;
        var salt = data[0].salt;
        var comedianInfo = data[0];

        if (compareHash(enteredPassword, oldPassword, salt)) {
          this.props.changeComedian(comedianInfo);
          this.props.history.push({ pathname: '/comediandash' });
        } else {
          alert('incorrect password');
          return;
        }
      },
      error: function(error) {
        console.error('failed to send', error);
      }
    })
  }

  handleUsernameInput(e){
    this.setState({email: e.target.value});
  }

  handlePasswordInput(e){
    this.setState({password: e.target.value})
  }

  render () {
    return (
      <div className='container'>
        <form action="/" onSubmit={this.handleLoginSubmit}>
          <h2 > Login </h2>
          <div className="form-group">
            <label> Email </label>
            <input type='text' placeholder="Email" name="email" className="form-control" onChange={this.handleUsernameInput} value={this.state.email} />
          </div>
          <div className="form-group">
            <label> Password </label>
            <input type='text' placeholder="Password" name="password" className="form-control" onChange={this.handlePasswordInput} value={this.state.password} />
          </div>
            <button type="submit" className="btn-sm btn-primary">Login</button>
          <CardText> Don't have an account? <Link to='/signup'> Create one </Link> </CardText>
        </form>
      </div>
    )
  }
}

export default LoginPage;