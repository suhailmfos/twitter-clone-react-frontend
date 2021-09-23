import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import './css/style.css';

import AuthenticationService from './services/AuthenticationService';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './roles/BoardUser';
import BoardModerator from './roles/BoardModerator';
import BoardAdmin from './roles/BoardAdmin';


export default class App extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state={
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount(){
        const user = AuthenticationService.getCurrentUser();
        if(user){
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            })
        }
    }
    logOut(){
        AuthenticationService.logout();
    }


    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-suhail">
                    <Link to={"/"} className="navbar-brand">
                        SUHAIL ANSARI
                    </Link>
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                        </li>

                        {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                            Moderator Board
                            </Link>
                        </li>
                        )}

                        {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                            Admin Board
                            </Link>
                            
                        </li>
                        )}

                        {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                            User
                            </Link>
                        </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                            LogOut
                            </a>
                        </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                            Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                            Sign Up
                            </Link>
                        </li>
                        </div>
                    )}
                    </nav>
            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />  
                </Switch>    
            </div>
        </div>
        )
    }
}
