import React from 'react';
import $ from 'jquery';
import EventListItem from './EventListItem.jsx';
import EventDetail from './EventDetail.jsx';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class EventList extends React.Component {
  constructor (props) {
    super(props);
    console.log(props.data);
  }

  render() {
    return (
      <div>
        <h3>Upcoming Events:</h3>
        <div class="form-group">
          <input type="text" class="form-control" id="user"/>
          <button type="button" class="btn btn-primary">Search</button>
        </div>
        <div className="row">
          {this.props.data.map( (event) => <EventListItem event={event} key={event.name}/> )}
        </div>
      </div>
    );
  }
}

export default EventList;
