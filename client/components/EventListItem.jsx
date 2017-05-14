import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Modal from 'react-modal';

import EventRegistrationForm from './EventRegistrationForm.jsx';


class EventListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={this.props.event.photo_url} alt="..." />        
          <div className="caption">
            <h3>{this.props.event.name}</h3>
            <p><strong>Date:</strong> {this.props.event.date}</p>
            <p><strong>Description:</strong> {this.props.event.description}</p>


            <button className="btn btn-primary btn-sm" onClick={this.openModal} data-toggle="modal">Register</button>
            
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Register Popup"
            >
              <EventRegistrationForm event={this.props.event}/>
              <p></p>
              <button className="btn-sm btn-default" onClick={this.closeModal}>Close</button>
            </Modal>

          </div>
        </div>
      </div>
    );
  }
}

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
    bottom: 200,
    padding: 30,
    border: '2px solid #444'
 }
};
export default EventListItem;