import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class EventRegistrationForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      audience: {
        name: "",
        email: "",
        phone: "",
        id_events: ""
      }
    };
    this.handleAudienceInput = this.handleAudienceInput.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
  }

  handleRegistrationSubmit(e){
    e.preventDefault();
    const audience=this.state.audience; 
    console.log({email: audience.email, name: audience.name, phone: audience.phone, id: audience.id_events});
    $.post('/audienceRegistration', audience)
      .done(function (data) {
        console.log('Sucessfully Registered');
      });
    this.setState({
      audience: {
        name: "",
        email: "",
        phone: "",
        id_events: ""
      }
    })    
  }

  handleAudienceInput(e){
    const field = e.target.name;
    const audience = this.state.audience;
    audience[field] = e.target.value; 
    audience['id_events'] = Number(this.props.event.id);
    this.setState({audience});
  }

  render() {
    return (
      <form onSubmit={this.handleRegistrationSubmit}>
        <h2> Event Registration: {this.props.event.name}</h2>
        <div className="form-group">
          <label>Name</label>
          <input type='text' placeholder="Name" name="name" className="form-control" onChange={this.handleAudienceInput} value={this.state.audience.name} />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type='text' placeholder="Email" name="email" className="form-control" onChange={this.handleAudienceInput} value={this.state.audience.email} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type='text' placeholder="Phone Number" name="phone" className="form-control" onChange={this.handleAudienceInput} value={this.state.audience.phone} />
        </div>
        <button type="submit" className="btn-sm btn-primary">Submit</button>
      </form>
    );
  }
}

export default EventRegistrationForm;