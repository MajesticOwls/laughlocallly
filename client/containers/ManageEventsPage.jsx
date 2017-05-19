import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import BookedEventsList from '../components/BookedEventsList.jsx';
import PendingEventsList from '../components/PendingEventsList.jsx';

class ManageEventsPage extends React.Component{
  constructor(props){
    super(props);  
  
    this.state = {
      comedianInfo: this.props.location.state.comedianInfo,
      update: false
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    this.setState({
      update: !this.state.update
    });
  }

  render () {
    return (
     <div> 
       <h1>Manage Events</h1>
       <PendingEventsList update={this.onUpdate} comedianInfo={this.state.comedianInfo}/>
       <BookedEventsList update={this.state.update} comedianInfo ={this.state.comedianInfo}/>
     </div>
    )
  }
}

export default ManageEventsPage;