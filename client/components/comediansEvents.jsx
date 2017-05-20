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
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={this.state.event.photo_url} alt="..." />
          <div className="caption">
            <h3>{this.state.event.name}</h3>
            <p><strong>Date:</strong> {this.state.event.date}</p>
            <p><strong>Time:</strong> {this.state.event.start_time} </p>
            <p><strong>Description:</strong>{this.state.event.description} </p>
            <p><strong>Address:</strong>{this.state.event.address}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ComedianEvents;
