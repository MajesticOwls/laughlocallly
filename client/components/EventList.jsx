import React from 'react';
import $ from 'jquery';
import EventListItem from './EventListItem.jsx';
import EventDetail from './EventDetail.jsx';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class EventList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      filteredEvents: [],
      firstLoad: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    console.log('props', this.props.data);
    let context= this;
    let filteredEvents = this.props.data.filter(function(event) {
      let lowerCaseEvent = event.name.toLowerCase();
      let lowerCaseValue = context.state.value.toLowerCase();
      return lowerCaseEvent.includes(lowerCaseValue);
    });
    this.setState({
      filteredEvents: filteredEvents,
      firstLoad: false,
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Upcoming Events:</h3>
        <div>
          <input value = {this.state.value} onSubmit={this.handleClick} onChange = {this.handleChange} type="text"  id="user"/>
          <button onClick={this.handleClick} type="button" >Search</button>
        </div>
        <div className="row">
          {this.state.firstLoad ? this.props.data.map( (event) => <EventListItem event={event} key={event.name}/> ) : this.state.filteredEvents.map( (event) => <EventListItem event={event} key={event.name}/> ) }
        </div>
      </div>
    );
  }
}

export default EventList;
