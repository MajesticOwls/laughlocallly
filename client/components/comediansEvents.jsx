import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class ComedianEvents extends React.Component {
  constructor ({props}) {
    super(props);
    this.state ={event: '', venue: ''}
  }

  componentDidMount() {
    this.setState({
      event: this.props.event
    });

    $.get('/getSpecificVenue', {id: this.props.event.id_venues})
    .done(data => {
      this.setState({
        venue: data[0]
      })
    })
  }

  render() {
    return (
      <div> Event: <em>{this.state.event.name}</em> 
        <div>
          location: {this.state.venue.address}
        </div>
        <div>
          date: {this.state.event.date}
        </div>
      </div>
    );
  }
}

export default ComedianEvents;
