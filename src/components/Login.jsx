import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import add from '../images/add.png';
import '../css/style.css';

// step 7
const required = (value)=>{
    if(!value){
        return (
            <div   
                className="alert alert-danger" 
                role="alert">
                    This field is required!
                </div>
        );
    }
};


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading:false,
            message: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    onChangeUsername(e){
        this.setState({username: e.target.value});
    }
    onChangePassword(e){
        this.setState({password: e.target.value});
    }
    handleLogin(e){
        e.preventDefault();
        this.setState({loading : true, message: ''});
        // I need to write code for validaation
        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0){
            // console.log("aa raha hai");
            AuthenticationService.login(this.state.username, this.state.password)
                .then(()=>{
                    this.props.history.push('/profile');
                    window.location.reload();
                },
                error=>{
                    const resMessage = (
                        error.response 
                        && error.response.data 
                        && error.response.data.message)
                        || error.message || error.toString();
                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                }
            );
        }
        else{
            this.setState({
                loading: false
            })
        }

        // if(this.state.username === 'root' && this.state.password === 'root'){
        //     this.props.history.push(`/employees`);
        //     // AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     // this.setState({showSuccessMessage: true});
        //     // this.setState({hasLoginFailed: false});
        // }else{
        //     this.setState({showSuccessMessage: false});
        //     this.setState({hasLoginFailed: true});
        // }
        // step 9 
        // Remove Authentication Hardcoding and Call the REST API for Basic Authentication
        // Let’s update the LoginComponent to use the service.
        
        // Let’s call it on successful login in loginClicked in LoginComponent:
        // We can now comment out the Basic Authentication call and call 
        // JWT authentication service in LoginComponent.
        // AuthenticationService
        //     // .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .executeJwtAuthenticationService(this.state.username, this.state.password)
        //     .then((response)=>{
        //         // Let’s call it on successful login in loginClicked in LoginComponent:
        //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, 
        //                 response.data.token);
        //         this.props.history.push(`/courses`);
        //     }).catch(()=>{
        //         this.setState({showSuccessMessage:true});
        //         this.setState({hasLoginFailed: false});
        //     });
    }


    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="card card-container">
                    <img
                        src={add}
                        // alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                        this.form = c;
                        }}
                    >
                        <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                        />
                        </div>

                        <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                        </div>

                        {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                            {this.state.message}
                            </div>
                        </div>
                        )}
                        <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                        />
                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}
