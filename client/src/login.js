// OBSOLETE


import RaisedButton from 'material-ui/RaisedButton';
import ApplicationContainer from './AppBody.js';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:"welcome",
            title:"Welcome to Our App"};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handle_login = this.handle_login.bind(this);
        // this.first_name_change = function(e) {
        //     this.state.first_name = e.target.value;
        // }
        // this.last_name_change = function(e) {
        //     this.state.last_name = e.target.value;
        // }
        // this.username_change = function(e) {
        //     this.state.username= e.target.value;
        // }
        }
        handle_login(e){
            e.preventDefault();
            this.setState({loggedIn: true});
        }
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
              [name]: value
            });
          }

    render() {
    return(
        //<div className = "body-container">
            <div className= {this.state.page + "-page"}>
            <h1 className="welcome-title"> {this.state.title} </h1>
            <form onSubmit={this.handle_login}>
            <div>
                <TextField type="text"
                name="first_name"
                label="First Name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleInputChange}/>
            </div>
            <div>
                <TextField type="text"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                label="Last Name"
                onChange={this.handleInputChange}/>
            </div>
            <div>
                <TextField type="text"
                name = "username"
                placeholder="User Name"
                value={this.state.username}
                label="User Name"
                onChange={this.handleInputChange}/>
            </div>
            <RaisedButton type="submit" className= "welcome-button" value="Post" label="Log In"/>
            </form>
            <RaisedButton className="welcome-button" label="Sign Up" onTouchTap={() => this.handleOnTouch()}/>
            </div>
        //</div>
    )
    }
}

export default LoginScreen