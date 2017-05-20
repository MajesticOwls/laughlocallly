import React, { PropTypes } from 'react';
import { hashPassword, createSalt, compareHash } from '../../server/hashUtils.js';
import $ from 'jquery';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.currentComedian,
      passwordChange: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleProfileDelete = this.handleProfileDelete.bind(this);
  }

  handleInput(e) {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }

  handlePasswordChange(e) {
    this.handleInput(e);
    this.setState({ passwordChange: true });
  }

  handleProfileUpdate(e) {
    e.preventDefault();
    const context = this;
    const user = this.state.user;
    if (this.state.passwordChange) {
      user.salt = createSalt();
      user.password = hashPassword(user.password, user.salt);
    }
    $.ajax({
      url: '/updateComedian',
      method: 'PUT',
      data: user
    })
    .done((data) => {
      if (!data) {
        alert('That email is already in use. Please enter another');
      } else {
        alert('Profile Updated!');
        context.props.changeComedian(user);
        context.props.history.push({ pathname: '/comediandash' });
      }
    })
    .fail((error) => {
      console.log('Update request failed:', error);
    })
  }

  handleProfileDelete(e) {
    e.preventDefault();
    const context = this;
    const user = this.state.user;
    if (window.confirm('Permanently delete your profile?')) {
      $.ajax({
        url: '/deleteComedian',
        method: 'DELETE',
        data: user
      })
      .done((data) => {
        alert('Profile Deleted!');
        context.props.changeComedian(null);
      })
      .fail((error) => {
        console.log('Delete request failed:', error);
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleProfileUpdate}>
          <div className="form-group">
            <input type='text' placeholder="Name" name="name" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="Email" name="email" className="form-control" onChange={this.handleInput} value={null} />
          </div>
          
          <div className="form-group">
            <input type='text' placeholder="Password" name="password" className="form-control" onChange={this.handlePasswordChange} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="Website" name="website" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="Bio" name="bio" className="form-control" onChange={this.handleInput} value={null} />
          </div>
         
          <div className="form-group">
            <input type='text' placeholder="Twitter" name="twitter" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="Photo url" name="photo_url" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="YouTube video url" name="video_url" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <div className="form-group">
            <input type='text' placeholder="Phone Number" name="phone" className="form-control" onChange={this.handleInput} value={null} />
          </div>

          <button type="submit" className="btn-sm btn-primary" >Update Profile</button>
        </form>

        <div className="alert alert-danger text-center">
          <button className="btn-sm btn-primary" onClick={this.handleProfileDelete} >Delete Profile</button>
        </div>
      </div>
    )
  }
}

export default EditProfile;