import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LoginScreen from './login.js';
import CreateProfile from './createprofile.js';
import Dashboard from './dashboard.js';
import TextField from 'material-ui/TextField';

class ApplicationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            createdProfile: false,
            data: []
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLoginClick() {
        this.setState({loggedIn: true});
    }

    handleProfile() {
        this.setState({createdProfile: true});
    }

    handleLogout() {
        this.setState({
            loggedIn: false,
            createdProfile: false,
            username: ""
        });
    }

    render() {
        const loggedIn = this.state.loggedIn;
        const createdProfile = this.state.createdProfile;
        if (createdProfile) {
            console.log(this.state.username);
            return(
                <div className="app-container">
                    <AppBar title="Name" className="app-bar"/>
                    <Dashboard state={this.state} onClick={this.handleLogout} />
                </div>
                );
        } else if (loggedIn) {
            return(
                <div className="app-container">
                    <AppBar title="Name" className="app-bar"/>
                    <div className="welcome-page">
                        <UserGreeting name={this.state.username}/>
                        <ProfileCreation onClick={this.handleProfile} />
                    </div>
                </div>
                );
        } else {
            return(
                <div className="app-container">
                    <AppBar title="Name" className="app-bar"/>
                    <div className="welcome-page">
                        <GuestGreeting />
                        <LoginButton parent={this} onClick={this.handleLoginClick}/>
                    </div>
                </div>
            );
        }
    }
}



function UserGreeting(props) {
  return <h2>Welcome back {props.name}! Pls create profile</h2>;
}

function GuestGreeting(props) {
  return <h2>Please sign up.</h2>;
}

// function LoginButton(props) {
//   return (
//     <RaisedButton onClick={props.onClick}>
//       Login
//     </RaisedButton>
//   );
// }

class LoginButton extends Component{
    constructor(props) {
        super(props);
        this.parent = props.parent;
        this.onClick = props.onClick;
        this.handleUsername = this.handleUsername.bind(this);
    }
    handleUsername(e) {
        this.parent.setState({username:e.target.value});
    }
    render() {
          return (
            <div>
            <TextField type="text"
            label="username"
            placeholder="User Name"
            value={this.parent.state.username}
            onChange={this.handleUsername}/>
            <RaisedButton onClick={this.onClick}>
              Login
            </RaisedButton>
            </div>
          );
      }
}

function ProfileCreation(props) {
  return (
    <RaisedButton onClick={props.onClick}>
      Create Profile
    </RaisedButton>
  );
}

// class BulletinBoard extends Component {

// }
export default ApplicationContainer;