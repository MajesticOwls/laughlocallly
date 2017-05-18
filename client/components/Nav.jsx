import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatBox from './ChatBoxNav.jsx';
// import ComedianDash from '../containers/ComedianDash.jsx'

class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chatNav: false
    }
  }

  hideChat() {
    var current=this.state.chatNav;

    this.setState({
      chatNav: !current
    })
    console.log(this.state.chatNav)
  }

  render () {
    return (
      <div className="Navigation">
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="navbar-header">
            <a className="navbar-brand navbar-left" href="/"> Laugh Local.ly </a>
          </div>
          <div className="container-fluid navbar-right">
            <ul className="nav navbar-nav">
              <li> <Link to="/comedianprofiles"> Book a Comedian </Link> </li>
              <li> <Link to="/login"> Log In </Link> </li>
              <li> <Link to="/signup"> Sign Up </Link> </li>
            </ul>
          </div>
        </nav>
          <div className='chatPosition'>
            <div className='row'>
              <div className='panel panel-chat'>
              <div onClick={this.hideChat.bind(this)} className='panel-heading'>
                <span >Chat</span>
              </div>
              <div>{this.state.chatNav ?
                <div><ChatBox/></div> : <div></div>}
              </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Navigation;
