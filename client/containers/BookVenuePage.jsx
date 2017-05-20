import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import BookVenueList from '../components/BookVenueList.jsx';


class BookVenuePage extends React.Component{
  constructor(props){
  super(props);

  this.state = {}
  }


  render () {
    return (
      <div> Book Venue
        <BookVenueList currentComedian={this.props.currentComedian}/>
      </div>
    )
  }

}

export default BookVenuePage;
