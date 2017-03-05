import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApplicationContainer from './AppBody.js';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <ApplicationContainer />
        </MuiThemeProvider>
    );
  }
}

export default App;
