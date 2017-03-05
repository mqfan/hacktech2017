import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LoginScreen from './login.js';
import CreateProfile from './createprofile.js';

class ApplicationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            createdProfile: false
        };
    }
    render() {
        if (this.state.createdProfile) {
                return(<h1>Logged in!</h1>);
        } else if (this.state.loggedIn) {
            return(
                <div className="app-container">
                    <AppBar title="Name" className="app-bar"/>
                    <CreateProfile />
                </div>
                );
        } else {
            return(
                <div className="app-container">
                    <AppBar title="Name" className="app-bar"/>
                    <LoginScreen />
                </div>
            );
        }
    }
}

// class BulletinBoard extends Component {

// }
export default ApplicationContainer;