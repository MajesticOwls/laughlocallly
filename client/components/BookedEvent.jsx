import React from 'react';

class BookedEvent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <div className="thumbnail">
        <img src={this.props.booked.photo_url} alt="..." />
        <div className="caption">
          <h3>{this.props.booked.name}</h3>
          <p><strong>Date:</strong> {this.props.booked.date}</p>
          <p><strong>Time:</strong> {this.props.booked.start_time}</p>
          <p><strong>Description:</strong> {this.props.booked.description}</p>
          <button className="btn btn-primary btn-sm" onClick={() => this.props.cancel(this.props.booked.name)}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default BookedEvent;
