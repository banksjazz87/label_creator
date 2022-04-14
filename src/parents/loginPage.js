import * as React from 'react';
import "../assets/login.scss";
import "../assets/library.scss";
import {useNavigate} from "react-router-dom"
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
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
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
        .then(response => this.redirectToSearchPage(response))
    }

    checkForUser(verified) {
        if (verified) {
            this.setState({
                validUser: true
            })
            return true;
        } else {
            this.setState({
                validUser: false
            })
        }
        return false;
    }

    redirectToSearchPage(valid) {
        if (valid) {
            console.log('redirect');
        } else {
            console.log('no redirect');
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

    /*const redirectOrNot = () => {
        if (props.valid) {
            console.log('login success');
            return(
                <Navigate to="search_page" />
            )
        } else {
            console.log('login failure');
        }
    }*/
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

            <button type="submit" onClick={()=> console.log('clicked')}>
                    
                Submit
               
            </button>

        </form>
    )
}

/*function SubmitButton(){
    let navigate = useNavigate();

    const testClick = () => navigate('search_page');
    return(
        <button onClick={testClick}>Search Page</button>
    )
}*/


export default LoginPage;