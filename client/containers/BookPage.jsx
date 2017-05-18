import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

class BookPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        host: {
          name: "",
          email: "",
          phone: ""
        },
        venue: {
          address: "",
          zipcode: "",
          photo_url: "",
          capacity: ""
        },
        event: {
          date: "",
          name: "",
          description: "",
          photo_url: "",
          start_time: "",
          end_time: "",
          comedian_id: this.props.location.state.comedian.id,
          status: "pending"
        }
    };

    this.handleHostInput = this.handleHostInput.bind(this);
    this.handleVenueInput = this.handleVenueInput.bind(this);
    this.handleEventInput = this.handleEventInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleBookSubmit = this.handleBookSubmit.bind(this);
  }

  handleBookSubmit(e){
    e.preventDefault();
    console.log(this.state.host, 'HOST');
    var host = this.state.host;
    var context = this;
    $.post('/bookcomedian', { host: host, 
      venue: context.state.venue, 
      event: context.state.event
    })
    .then(() => {
      // redirect to an actual popup if time
      alert('Booking submitted for comedian to review!')
    })
    .fail(({responseJSON}) => {
      responseJSON.error.errors.forEach((err) => 
        console.error(err)
      );
    })
  }
  
  handleHostInput(e){
    const field = e.target.name;
    const host = this.state.host;
    host[field] = e.target.value; 
    this.setState({host});
    console.log(this.state.host)
  }

  handleVenueInput(e){
    const field = e.target.name;
    const venue = this.state.venue;
    venue[field] = e.target.value; 
    this.setState({venue});
    console.log(this.state.venue)
  }

  handleEventInput(e){
    const field = e.target.name;
    const event = this.state.event;
    event[field] = e.target.value; 
    this.setState({event});
    console.log(event)
  }

  handleDateInput(dateString){
    const event = this.state.event;
    event["date"] = dateString;
    this.setState({event})
    console.log(event)
  }

  render () {
    return (
      <div className="container">
        <h2> Laugh With {this.props.location.state.comedian.name}</h2>
        <div className="eventformheader"> About Your Event </div>
        <form action='/' onSubmit={this.handleBookSubmit}>
          <div className="form-group">
            <label> Name </label>
            <input
                id="eventname"
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter a short event name"
                onChange={this.handleEventInput}
                value={this.state.event.name}
            />
          </div>
          <div className="form-inline date">
            <div className="col-md-4 nopadding">
              <label> Date </label>
              <DateField
                dateFormat="MM-DD-YYYY"
                onChange={this.handleDateInput}
              />
            </div>
            <div className="col-md-4">
              <label> Start Time </label>
              <input
                  placeholder="13:30:00"
                  type="time"
                  className="form-control"
                  name="start_time"
                  onChange={this.handleEventInput}
                  value={this.state.event.start_time}
              />
            </div>
            <div className="col-md-4">
              <label> End Time </label>
              <input
                  type="time"
                  className="form-control"
                  name="end_time"
                  onChange={this.handleEventInput}
                  value={this.state.event.end_time}
              />
            </div>
          </div>
          <div className="form-group">
            <label> Description </label>
            <textarea
                rows="3"
                id="eventdesc"
                type="text"
                className="form-control"
                name="description"
                onChange={this.handleEventInput}
                value={this.state.event.description}
                placeholder="A few sentences to give the comedian a sense of what your event is about"
            />
          </div>
          <div className="form-group">
            <label> Location </label>
            <input
                id="eventloc"
                type="text"
                className="form-control"
                onChange={this.handleVenueInput}
                value={this.state.venue.address}
                name="address"
                placeholder="Address"
            />
            <input
                id="eventloc"
                type="number"
                className="form-control"
                name="zipcode"
                onChange={this.handleVenueInput}
                value={this.state.venue.zipcode}
                placeholder="Zipcode"
            />
          </div>
          <div className="form-group">
            <label> Audience Size </label>
            <select
                id="eventcap"
                className="form-control"
                name="capacity"
                onChange={this.handleVenueInput}>
              <option value="1-20"> 1 - 20 </option>
              <option value="21-50"> 21 - 50 </option>
              <option value="51-100"> 51 - 100 </option>
              <option value="101-500"> 101 - 500 </option>
              <option value="501-1000"> 501 - 1000 </option>
              <option value="1001+"> 1001+ </option>
            </select>
          </div>
          <div className="form-group">
            <label> Photo of Event </label>
            <input
                id="eventphoto"
                type="text"
                className="form-control"
                name="photo_url"
                onChange={this.handleEventInput}
                value={this.state.event.photo_url}
                placeholder="Paste an url of a cover photo for your event"
            />
          </div>
          <div className="eventformheader"> About You </div>
          <div className="form-group">
            <label> Name </label>
            <input
                id="eventdesc"
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleHostInput}
                value={this.state.host.name}
                placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label> Email </label>
            <input
                id="eventdesc"
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleHostInput}
                value={this.state.host.email}
                placeholder="Your email"
            />
          </div>
          <div className="form-group">
            <label> Phone </label>
            <input
                id="eventdesc"
                type="tel"
                className="form-control"
                name="phone"
                onChange={this.handleHostInput}
                value={this.state.host.phone}
                placeholder="Your phone"
            />
          </div>
          <button type="submit" className="btn btn-default"> Submit </button>
        </form>
        <p> </p>
      </div>
    )
  }
}

export default BookPage;