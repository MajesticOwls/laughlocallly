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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    let context= this;
    let filteredEvents = this.props.data.filter(function(event) {
      let lowerCaseEvent = event.name.toLowerCase();
      let lowerCaseValue = context.state.value.toLowerCase();
      return lowerCaseEvent.includes(lowerCaseValue);
    });
    this.setState({
      filteredEvents: filteredEvents,
      firstLoad: false,
      value: '',
    });
  }

  handleKeyPress(e) {
    if ( e.key === 'Enter' ) {
      this.handleClick();
    }
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
          <input value = {this.state.value} onKeyPress={this.handleKeyPress} onChange = {this.handleChange} type="text"  id="user"/>
          <button onClick={this.handleClick} type="button" >Search</button>
        </div>
        <div className="row">
          {this.state.firstLoad ? this.props.data.map( (event, idx) => <EventListItem event={event} key={idx}/> ) : this.state.filteredEvents.map( (event, idx) => <EventListItem event={event} key={idx}/> ) }
        </div>
      </div>
    );
  }
}

export default EventList;
