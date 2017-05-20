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

    this.inOrOut = this.inOrOut.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.ShowDashboardLink = this.ShowDashboardLink.bind(this);
  }

  hideChat() {
    var current=this.state.chatNav;

    this.setState({
      chatNav: !current
    })
    console.log(this.state.chatNav)
  }

  inOrOut() {
    return this.props.currentComedian ? 'Log Out' : 'Log In';
  }

  handleLogClick() {
    if (this.props.currentComedian) this.props.changeComedian(null);
  }

  ShowDashboardLink() {
    return this.props.currentComedian ? <li><Link to="/comediandash"> My Dashboard </Link></li> : <li></li>;
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
              <li><Link to="/comedianprofiles"> Book a Comedian </Link></li>
              <this.ShowDashboardLink/>
              <li onClick={this.handleLogClick} ><Link to="/login">{this.inOrOut()}</Link></li>
              <li><Link to="/signup"> Sign Up </Link></li>
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
