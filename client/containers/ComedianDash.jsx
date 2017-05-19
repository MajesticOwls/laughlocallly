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
    const loggedIn = !!this.props.location.state;
    if (loggedIn) {
      return (
        <BrowserRouter>
          <div className="container">
            <nav className="navbar navbar-lower comedianNav">
              <div className="navbar-header">
                <a className="navbar-brand navbar-left" href="/"> Welcome, {this.props.location.state.comedianInfo.name}! </a>
              </div>
              <div className="container-fluid navbar-right">
                <ul className="nav navbar-nav">
                  <li><Link to={{
                    pathname: "/editcomedianprofile",
                    state: { comedianInfo: this.props.location.state.comedianInfo }
                  }} > Edit Profile </Link></li>
                  <li><Link to={{
                    pathname: "/bookvenue",
                    state: { comedianInfo: this.props.location.state.comedianInfo }
                    }} > Open Gigs </Link></li>
                  <li><Link to={{
                    pathname: "/manageevents",
                    state: { comedianInfo: this.props.location.state.comedianInfo }
                  }} > Manage Events </Link></li>
                </ul>
              </div>
            </nav>
            <Route path="/editcomedianprofile" component={EditProfile} />
            <Route path="/bookvenue" component={BookVenuePage} />
            <Route path="/manageevents" component={ManageEventsPage} />
          </div>
        </BrowserRouter>
      )
    }
    return (<div> Please login or signup </div>)
  }
}
export default ComedianDash;
