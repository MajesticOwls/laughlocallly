import React from 'react';
import $ from 'jquery';
import VenueList from './VenueList.jsx';

class VenuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      allVenues: [],
    };
    this.fetch = this.fetch.bind(this);    
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    var that = this;
    $.get('/getVenues')
    .done(function (data){
      that.setState({
        allVenues: data
      })
    })
  }

  render () {
    return (
      <div>
        <h1>Venue Page</h1>
        <VenueList data={this.state.allVenues}/>
      </div>
    )
  }
}

export default VenuePage;
