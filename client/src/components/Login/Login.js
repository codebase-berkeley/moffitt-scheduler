import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsSle = this.handleIsSle.bind(this);
    this.handleIsSupervisor = this.handleIsSupervisor.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.state = { redirect: null };
  }

  handleIsSle = resp => {
    if (resp != null && resp != undefined) {
      var linkString = `/calendar/${resp}`;
      this.setState({ redirect: <Redirect push to={linkString} /> });
    }
  };

  handleIsSupervisor = resp => {
    if (resp) {
      this.setState({ redirect: <Redirect push to="/employees" /> });
    }
  };

  render() {
    return (
      <div className="wholePage">
        {this.state.redirect}
        <div className="loginBox">
          <div className="loginBoxUpperPart">
            <div className="login">
              <h1>Log In</h1>
            </div>
          </div>
          <div className="loginBoxLowerPart">
            <div className="emailBox">
              <div className="email">
                <input type="text" placeholder="Email" id="email"></input>
              </div>
            </div>
            <div className="passwordBox">
              <div className="password">
                <input type="text" placeholder="Password" id="password"></input>
              </div>
            </div>
            <div className="button-container">
              <button className="logInButton" onClick={this.loginClick}>
                Log In
              </button>
              <button
                className="createAccountButton"
                onClick={this.createAccountClick}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  loginClick() {
    var email = document.getElementById("email");
    var emailText = email.value;
    console.log(emailText);
    var password = document.getElementById("password");
    var passwordText = password.value;
    console.log(passwordText);
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailText, password: passwordText })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.handleIsSle(jsonResponse.isSle);
        this.handleIsSupervisor(jsonResponse.isSupervisor);
        console.log(jsonResponse);
      });
  }
  createAccountClick() {
    console.log("somethingElse");
  }
}
export default Login;
