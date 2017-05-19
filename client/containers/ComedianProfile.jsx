import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import ComedianEvents from '../components/comediansEvents.jsx'

class ComedianProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      bookedEventList: [],
      youTubeId: ''
    }

  }

  componentDidMount() {
    this.getBookedEvents();
    this.getYouTubeId();
  }

  getBookedEvents() {
    $.get('/getBookedEvents', {id: this.props.comedian.id + 1})
    .done(data => {
      console.log('data received', data)
      this.setState({
        bookedEventList: data
      })
    })
  }

  getYouTubeId() {
    const url = this.props.comedian.video_url;
    this.setState({ youTubeId: url.includes('youtu.be') ? url.slice(17) : url.slice(32) });
  }

  render () {
    const { name, bio, id } = this.props.comedian;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="comedianheader">
              <h1> {name} </h1>
            </div>
            <p className="bio"> {bio} </p>
            <div>
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.state.youTubeId}`} frameBorder='0' allowFullScreen />
            </div>
          </div>
            <div className="container sidebar">
              <div className="col-md-4">
                <Link to={{ pathname: "/book", state: {comedian: this.props.comedian} }}><button value={id} type="button" className="btn btn-default "> Book </button></Link>
                <div className="upcoming-events">
                  <b>Upcoming Events</b>
                  <div>
                    {this.state.bookedEventList.map(event => {return (<ComedianEvents event={event}/>) })}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ComedianProfile
