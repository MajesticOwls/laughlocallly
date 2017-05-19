import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import $ from 'jquery';
import ChatBox from './ChatBox.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import Navigation from './Nav.jsx';
import EventPage from './EventPage.jsx';
import ComedianDash from '../containers/ComedianDash.jsx'
import ComedianList from './ComedianList.jsx';
import ComedianProfile from '../containers/ComedianProfile.jsx'
import BookPage from '../containers/BookPage.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      comedians: [],
      allEvents: [],
      loggedIn: false
    }

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    this.setState({ loggedIn: !this.state.loggedIn });
  }

  componentWillMount(){
    let context=this;
    $.get('/getComedians')
     .done(function(data){
        // console.log(data, 'COMEDIAN DATA');
        context.setState({comedians: data});
     })
     .fail(function(err){
        console.error(err, "ERROR RECEIVING INFO")
     });

    $.get('/getAllEventsForEventPage')
    .done(function (data){
      console.log('all events data', data);
      context.setState({
        allEvents: data
      })
    })
  }

  render () {
    return (
      <div>
        <div>
          <Navigation loggedIn={this.state.loggedIn} isLoggedIn={this.isLoggedIn} />
        </div>
        <Route exact path='/' component={EventPage} />
        <Route path="/comedianprofiles" component={(props) => <ComedianList comedians={this.state.comedians}{...props} />} />
        <Route path="/login/" component={props => <LoginPage isLoggedIn={this.isLoggedIn} {...props} />} />
        <Route path="/signup" component={props => <SignupPage isLoggedIn={this.isLoggedIn} {...props} />} />
        <Route path="/book" component={BookPage} />
        <Route path="/ComedianDash" component={props => <ComedianDash loggedIn={this.state.loggedIn} {...props} />} />
        <Route path="/chatBox" component={(props) => <ChatBox data={this.state.allEvents}{...props} />} />
        <Route
        path="/profile/:name"
        component={(props) => {
            // console.log(props);
            const profiles = this.state.comedians.filter((comedian) => props.match.params.name === comedian.name);
            // console.log(profiles[0]);
            return <ComedianProfile comedian={profiles[0]} {...props} />
        }}
        />
      </div>


    )
  }
}

export default App;
