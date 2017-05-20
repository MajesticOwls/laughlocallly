import React, { PropTypes } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BookVenuePage from './BookVenuePage.jsx';
import ManageEventsPage from './ManageEventsPage.jsx';
import EditProfile from '../components/EditProfile.jsx';

class ComedianDash extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tab: 0
    }

    this.manageEventsTab = this.manageEventsTab.bind(this);
    this.openGigsTab = this.openGigsTab.bind(this);
    this.editProfileTab = this.editProfileTab.bind(this);
    this.ShowPage = this.ShowPage.bind(this);
  }

  manageEventsTab() {
    this.setState({ tab: 0 });
  }

  openGigsTab() {
    this.setState({ tab: 1 });
  }

  editProfileTab() {
    this.setState({ tab: 2 });
  }

  ShowPage(props) {
    if (props.tab === 0) {
      return <ManageEventsPage currentComedian={this.props.currentComedian} />;
    } else if (props.tab === 1) {
      return <BookVenuePage currentComedian={this.props.currentComedian} />;
    } else if (props.tab === 2) {
      return <EditProfile currentComedian={this.props.currentComedian} changeComedian={this.props.changeComedian} />;
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
                  <li className="nav-item" onClick={this.manageEventsTab}><a> Manage Events </a></li>
                  <li className="nav-item" onClick={this.openGigsTab}><a> Open Gigs </a></li>
                  <li className="nav-item" onClick={this.editProfileTab}><a> Edit Profile </a></li>
                </ul>
              </div>
            </nav>
            <this.ShowPage tab={this.state.tab}/>
          </div>
        </BrowserRouter>
      )
    }
    return (<div> Please login or signup </div>)
  }
}
export default ComedianDash;
