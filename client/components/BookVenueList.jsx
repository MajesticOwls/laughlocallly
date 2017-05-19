import React from 'react';
import $ from 'jquery';
import BookVenue from './BookVenue.jsx';

class BookVenueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openVenueList: [],
    };
    this.getOpenEvents = this.getOpenEvents.bind(this);
    // this.acceptEvent = this.acceptEvent.bind(this);
    // this.denyEvent = this.denyEvent.bind(this);
  }

  componentDidMount() {
    this.getOpenEvents();
  }

  getOpenEvents() {
    $.get('/getOpenEvents')
    .done(data => {
      console.log('data from open', data)
      this.setState({
        openVenueList: data
      })
    })
    .fail(err => {
      console.error('Error occured while getting pending data', err);
    })
  }

  // acceptEvent(eventName) {
  //   const pendingList = this.state.pendingEventList;
  //   const eventPos = pendingList.map(event => event.name).indexOf(eventName);
  //   console.log('Accept Event id', eventPos);
  //   $.get('updateStatusToBooked', {id: pendingList[eventPos].id})
  //   .done(data => {
  //     console.log('Success while acceping data event to book', data);
  //   })
  //   .fail(err => {
  //     console.error('Error in accpetEvent', err);
  //   })
  // }

  // denyEvent(eventName) {
  //   const pendingList = this.state.pendingEventList;
  //   const eventPos = pendingList.map(event => event.name).indexOf(eventName);
  //   console.log('Deny Event id', eventPos);
  //   $.get('updateStatusToOpen', {id: pendingList[eventPos].id})
  //   .done(data => {
  //     console.log('Success while denying data event to book', data);
  //   })
  //   .fail(err => {
  //     console.error('Error in denyEvent', err);
  //   })
  // }
  changeRender(data) {
    var context = this;
    var userid = this.props.user.history.location.state.comedianInfo.id;
    $.ajax({
      type: 'POST',
      url: '/remove/data',
      contentType: 'application/JSON',
      data: JSON.stringify({
              key: data.id,
              id: userid
            })
    })
    .done((data) => {
      context.setState({
        openVenueList: data
      })
      console.log('updated venueList', data);
    })
    .fail((err) => {
      console.log('did not update events');
    })
  }

  render() {
    console.log('open events list', this.state.openVenueList)
    return (
      <div className="col-sm-6 col-md-4">
        <h3>Open Event Details!</h3>
        {this.state.openVenueList.length ? this.state.openVenueList.map( (open) => <BookVenue open={open} key={open.id} list={this.changeRender.bind(this)}/> ) : <h3>No Open Events</h3>}
      </div>
    );
  }
}

export default BookVenueList;
