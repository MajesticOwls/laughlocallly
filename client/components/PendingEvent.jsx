import React from 'react';
import Modal from 'react-modal';
import EventRegistrationForm from './EventRegistrationForm.jsx';


class PendingEvent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ModalIsOpen: true
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  acceptJob() {
    this.props.accept(this.props.pending.name);
    var context = this;
    $.ajax({
      type:'POST',
      url: '/stripe',
      contentType: 'application/JSON',
      data: JSON.stringify({
        accept: this.props.pending
      })
    })
    .done((data) => {
      context.openModal();
      console.log('receipt send via email');
    })
    .fail((err) => {
      console.log('did not send receipt');
    })

  }

  openModal() {
    console.log('modal Open');
    this.setState({ModalIsOpen: true});
  }

  closeModal() {
    this.setState({ModalIsOpen: false});
  }

  render() {
    console.log('pending props', this.props.pending)
    const customStyles = {
      overlay : {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
     },
     content : {
        position: 'absolute',
        background: '#fff',
        top: 150,
        left: '10%',
        right: '10%',
        bottom: 100,
        padding: 30,
        border: '2px solid #444'
     }
    };
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

            <Modal
              isOpen={this.state.ModalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Register Popup"
            >
              <EventRegistrationForm audienceCount = {this.getAudienceCount} close = {this.closeModal} event={this.props.event}/>
              <p></p>
              <button className="btn-sm btn-default" onClick={this.closeModal}>Close</button>
            </Modal>
          </div>
        </div>
      </div>

    );
  }
}

export default PendingEvent;
