import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field'
// import LoginForm from './LoginForm.jsx';
import { Link } from 'react-router-dom';
import { hashPassword, createSalt, compareHash } from '../../server/hashUtils.js';
import $ from 'jquery';


class SignupPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        website: '',
        phone: '',
        twitter: '',
        photo_url: '',
        video_url: '',
        bio: ''
      }
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleSignupSubmit(e){
    e.preventDefault();
    var user=this.state.user; 
    user.salt = createSalt();
    var hash = hashPassword(user.password, user.salt)
    user.password = hash;
    var context = this;
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: user,
      success: function(data) {
        var comedianInfo = data;
        if (!data) {
          alert('There is already an email associated with this account. Please click on the log-in tab to sign-in');
          // context.props.history.push('/login');
        } else {
          context.props.changeComedian(comedianInfo);
          alert('Successful sign-up!');
          context.props.history.push({
            pathname: '/comediandash',
            state: {comedianInfo: comedianInfo}
          })
        }
      },
      error: function(error) {
        console.error('failed to send', error);
      }
    })
  }

  handleUserInput(e){
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value; 
    this.setState({user});
  }

  render () {
    return (
      <div className='container'>
        <form  onSubmit={this.handleSignupSubmit}>
          <h2 > Comedian Sign Up </h2>

          <div className="form-group">
            <label> Name </label>
            <input type='text' placeholder="Name" name="name" className="form-control" onChange={this.handleUserInput} value={this.state.user.name} />
          </div>

          <div className="form-group">
            <label> Email </label>
            <input type='text' placeholder="Email" name="email" className="form-control" onChange={this.handleUserInput} value={this.state.user.email} />
          </div>
          
          <div className="form-group">
            <label> Create Password </label>
            <input type='text' placeholder="Password" name="password" className="form-control" onChange={this.handleUserInput} value={this.state.user.password} />
          </div>

          <div className="form-group">
            <label> Website </label>
            <input type='text' placeholder="Website" name="website" className="form-control" onChange={this.handleUserInput} value={this.state.user.website} />
          </div>

          <div className="form-group">
            <label> Bio </label>
            <input type='text' placeholder="Bio" name="bio" className="form-control" onChange={this.handleUserInput} value={this.state.user.bio} />
          </div>
         
          <div className="form-group">
            <label> Twitter </label>
            <input type='text' placeholder="Twitter" name="twitter" className="form-control" onChange={this.handleUserInput} value={this.state.user.twitter} />
          </div>

          <div className="form-group">
            <label> Link a Photo of Yourself! </label>
            <input type='text' placeholder="url" name="photo_url" className="form-control" onChange={this.handleUserInput} value={this.state.user.photo_url} />
          </div>

          <div className="form-group">
            <label> Add a Video </label>
            <input type='text' placeholder="YouTube video url" name="video_url" className="form-control" onChange={this.handleUserInput} value={this.state.user.video_url} />
          </div>

          <div className="form-group">
            <label> Phone Number </label>
            <input type='text' placeholder="Phone Number" name="phone" className="form-control" onChange={this.handleUserInput} value={this.state.user.phone} />
          </div>

          <button type="submit" className="btn-sm btn-primary">Create New Account</button>
        </form>
      </div>
    )
  }

}

export default SignupPage;