import React, { PropTypes } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BookVenuePage from './BookVenuePage.jsx';
import ManageEventsPage from './ManageEventsPage.jsx';
import EditProfile from '../components/EditProfile.jsx';

class ComedianDash extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render () {
    const loggedIn = this.props.currentComedian;
    if (loggedIn) {
      return (
        <BrowserRouter>
          <div className="container">
            <nav className="navbar navbar-lower comedianNav">
              <div className="navbar-header">
                <a className="navbar-brand navbar-left" href="/"> Welcome, {this.props.currentComedian.name}! </a>
              </div>
              <div className="container-fluid navbar-right">
                <ul className="nav navbar-nav">
                  <li><Link to="/editcomedianprofile"> Edit Profile </Link></li>
                  <li><Link to={{
                    pathname: "/bookvenue",
                    state: { comedianInfo: this.props.currentComedian }
                    }} > Open Gigs </Link></li>
                  <li><Link to="/manageevents"> Manage Events </Link></li>
                </ul>
              </div>
            </nav>
            <Route path="/editcomedianprofile" component={props => <EditProfile currentComedian={this.props.currentComedian} changeComedian={this.props.changeComedian} {...props} />} />
            <Route path="/bookvenue" component={props => <BookVenuePage currentComedian={this.props.currentComedian} {...props} />} />
            <Route path="/manageevents" component={props => <ManageEventsPage currentComedian={this.props.currentComedian} {...props} />} />
          </div>
        </BrowserRouter>
      )
    }
    return (<div> Please login or signup </div>)
  }
}
export default ComedianDash;
