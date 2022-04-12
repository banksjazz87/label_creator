import * as React from 'react';
import "../assets/login.scss";
import "../assets/library.scss";
import { Link } from "react-router-dom";
import postData from "../functions/postRequest.js";

class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            validUser: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkForUser = this.checkForUser.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const currentId = e.target.id;
        this.setState({
            [currentId]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        postData('/', this.state)
        .then(data => this.checkForUser(data.validated))
    }

    checkForUser(verified) {
        if (verified) {
            this.setState({
                validUser: true
            })
        } else {
            this.setState({
                validUser: false
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Welcome to the login page</h1>
                <LoginForm 
                    changeHandler={this.handleChange}
                    submitHandler={this.handleSubmit}
                    valid={this.state.validUser}
                />
                <p id="invalid_user_message" style={this.state.validUser === false ? {display: ''} : {display: 'none'}}>Username and/or Password are incorrect.</p>

            </div>

        )
    }
}

function LoginForm(props) {
    return(
        <form action='' onSubmit={props.submitHandler}>
            <label for="username">Username</label>
            <input 
                id="username" 
                type="text"
                onChange={props.changeHandler}
            />
            <br />

            <label for="password">Password</label>
            <input 
                id="password" 
                type="password"
                onChange={props.changeHandler}
            />
            <br />

            <button type="submit" onSubmit={props.submitHandler}>
                <Link 
                    to={props.valid === true ? "/search_page" : ""}
                    className="button"
                    onClick={props.submitHandler}
                >
                    
                Submit
                </Link>
            </button>

        </form>
    )
}


export default LoginPage;