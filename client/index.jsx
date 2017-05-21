import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App.jsx';
import EventMap from './components/Map.jsx'



injectTapEventPlugin();

// ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}>
//   <BrowserRouter><App /></BrowserRouter></MuiThemeProvider>, document.getElementById('app'));

 // <Events events={this.state.events} />

 //
 //

 ReactDOM.render(<EventMap />, document.getElementById('app'));