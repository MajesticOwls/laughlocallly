import React from 'react';

class PendingEvent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  acceptJob() {
    this.props.accept(this.props.pending.name);
    $.ajax({
      type:'POST',
      url: '/stripe',
      contentType: 'application/JSON',
      data: JSON.stringify({
        accept: this.props.pending
      })
    })
    .done((data) => {
      console.log('receipt send via email');
    })
    .fail((err) => {
      console.log('did not send receipt');
    })

  }


  render() {
    console.log('pending props', this.props.pending)
    return (
      <div>
        <div className="thumbnail">
          <img src={this.props.pending.photo_url} alt="..." />
          <div className="caption">
            <h3>{this.props.pending.name}</h3>
            <p><strong>Date:</strong> {this.props.pending.date}</p>
            <p><strong>Time:</strong> {this.props.pending.start_time}</p>
            <p><strong>Description:</strong> {this.props.pending.description}</p>
            <button className="btn btn-primary btn-sm" onClick={this.acceptJob.bind(this)}>Accept</button>
            <button className="btn btn-primary btn-sm" onClick={() => this.props.deny(this.props.pending.name)}>Deny</button>
          </div>
        </div>
      </div>

    );
  }
}

export default PendingEvent;
