import React from 'react';
import $ from 'jquery';
import EventListItem from './EventListItem.jsx';
import EventDetail from './EventDetail.jsx';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class EventList extends React.Component {
  constructor (props) {
    super(props);
    console.log(props.data);
    this.state = {
      value: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    console.log("Hello");
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    }, function() {console.log(this.state.value)});
  }

  render() {
    return (
      <div>
        <h3>Upcoming Events:</h3>
        <div class="form-group">
          <input value = {this.state.value} onChange = {this.handleChange} type="text" class="form-control" id="user"/>
          <button onClick={this.handleClick} type="button" class="btn btn-primary">Search</button>
        </div>
        <div className="row">
          {this.props.data.map( (event) => <EventListItem event={event} key={event.name}/> )}
        </div>
      </div>
    );
  }
}

export default EventList;
