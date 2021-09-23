import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService';


/* 
    This page gets current User from Local Storage by calling 
    AuthService.getCurrentUser() method and show user information (with token).
*/
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser: AuthenticationService.getCurrentUser()
        };
    }
    render() {
        const {currentUser} = this.state;

        return (
            <div>
                <div className="container">
                    <header className="jumbotron">
                        <h3>
                            <strong>
                                {currentUser.username}
                                </strong> Profile
                        </h3>
                    </header>
                    <p>
                        <strong>Token: </strong>{"  "}
                        {currentUser.token.substring(0,20)}...{" + "}
                        {currentUser.token.substr(currentUser.token.length-20)}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:{" "}  {currentUser.email}</strong>
                        
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles && 
                            currentUser.roles.map((role, index) =>
                                <li key={index}>{role}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}