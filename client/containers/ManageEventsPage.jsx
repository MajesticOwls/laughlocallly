import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import BookedEventsList from '../components/BookedEventsList.jsx';
import PendingEventsList from '../components/PendingEventsList.jsx';

class ManageEventsPage extends React.Component{
  constructor(props){
    super(props);  
  
    this.state = {
      comedianInfo: this.props.location.state.comedianInfo
    }
    this.onAcceptChange = this.onAcceptChange.bind(this);
  }

  onAcceptChange() {
    this.forceUpdate();
  }

  render () {
    return (
     <div> 
       <h1>Manage Events</h1>
       <PendingEventsList comedianInfo={this.state.comedianInfo}/>
       <BookedEventsList comedianInfo ={this.state.comedianInfo}/>
     </div>
    )
  }
}

export default ManageEventsPage;