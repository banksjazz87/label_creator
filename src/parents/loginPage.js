import * as React from 'react';
import "../assets/login.scss";
import { Link } from "react-router-dom";
import postData from "../functions/postRequest.js";

class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        .then(data => console.log(data))
    }

    render(){
        return(
            <div>
                <h1>Welcome to the login page</h1>
                <LoginForm 
                    changeHandler={this.handleChange}
                    submitHandler={this.handleSubmit}
                />

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

            <button type="submit" onSubmit={props.submitHandler}>Submit</button>

        </form>
    )
}


export default LoginPage;