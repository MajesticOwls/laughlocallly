import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import EventRegistrationForm from './EventRegistrationForm.jsx';
import ChatBox from './ChatBox.jsx';

class EventDetail extends React.Component {
  constructor ({props}) {
    super(props);
  }

  render() {
    return (
      <div>
        <EventRegistrationForm event={this.props.data} eventID={this.props.match.params.id}/>
      </div>
    );
  }
}

export default EventDetail;
