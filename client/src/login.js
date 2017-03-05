import RaisedButton from 'material-ui/RaisedButton';
import ApplicationContainer from './AppBody.js';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {page:"welcome", title:"Welcome to Our App", first_name:"", last_name:"", user_name:""};
        this.handle_login = function(e){
            e.preventDefault();
            var first_name = this.state.first_name.trim();
            var last_name = this.state.last_name.trim();
            alert(first_name, last_name);
        }
    }


    render() {
    return(
        //<div className = "body-container">
            <div className= {this.state.page + "-page"}>
            <h1 className="welcome-title"> {this.state.title} </h1>
            <form onSubmit={this.handle_login}>
            <div>
                <TextField type="text"
                label="First Name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={(props) -> this.state}/>
            </div>
            <div>
                <TextField type="text"
                placeholder="Last Name"
                value={this.state.last_name}
                label="Last Name"/>
            </div>
            <div>
                <TextField type="text"
                placeholder="User Name"
                value={this.state.user_name}
                label="User Name"/>
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