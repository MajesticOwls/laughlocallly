import React from 'react';
import $ from 'jquery';
import PendingEvent from './PendingEvent.jsx';

class PendingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingEventList: []
    };
    
    this.getPendingEvent = this.getPendingEvent.bind(this);
    this.acceptEvent = this.acceptEvent.bind(this);
    this.denyEvent = this.denyEvent.bind(this);
  }

  componentDidMount() {
    this.getPendingEvent();
  }

  getPendingEvent() {
    $.get('/getPendingEvents', {id: this.props.comedianInfo.id + 1})
    .done(data => {
      this.setState({
        pendingEventList: data
      })
    })
    .fail(err => {
      console.error('Error occurred while getting pending data', err);
    })
  }

  acceptEvent(eventName) {
    const pendingList = this.state.pendingEventList;
    const eventPos = pendingList.map(event => event.name).indexOf(eventName);
    let context= this;
    console.log('Accept Event id', eventPos);
    $.get('updateStatusToBooked', {id: pendingList[eventPos].id})
    .done(data => {
      console.log('Success while accepting data event to book', data);
      context.getPendingEvent();
    })
    .fail(err => {
      console.error('Error in accpetEvent', err);
    })
  }

  denyEvent(eventName) {
    const pendingList = this.state.pendingEventList;
    const eventPos = pendingList.map(event => event.name).indexOf(eventName);
    console.log('Deny Event id', eventPos);
    $.get('updateStatusToOpen', {id: pendingList[eventPos].id})
    .done(data => {
      console.log('Success while denying data event to book', data);
    })
    .fail(err => {
      console.error('Error in denyEvent', err);
    })
  }

  render() {
    console.log('pending events list', this.state.pendingEventList)
    return (
      <div className="col-sm-6 col-md-4"> 
        <h3>Pending event details!</h3>
        {this.state.pendingEventList.length ? this.state.pendingEventList.map( (pending) => <PendingEvent deny={this.denyEvent} accept={this.acceptEvent} pending={pending} key={pending.id}/> ) : <h3>No Pending Events</h3>} 
      </div>
    );
  }
}

export default PendingEvents;
