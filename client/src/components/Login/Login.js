import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsSle = this.handleIsSle.bind(this);
    this.handleIsSupervisor = this.handleIsSupervisor.bind(this);
    this.state = { isSle: false, isSupervisor: false };
  }

  handleIsSle = resp => {
    this.setState({ isSle: resp });
  };

  handleIsSupervisor = resp => {
    this.setState({ isSupervisor: resp });
  };

  render() {
    let button;
    if (this.isSle) {
      button = (
        <a href="/yourshifts">
          <button className="logInButton" onClick={this.loginClick}>
            Log In
          </button>
        </a>
      );
    } else if (this.isSupervisor) {
      button = (
        <a href="/employees">
          <button className="logInButton" onClick={this.loginClick}>
            Log In
          </button>
        </a>
      );
    }
    return (
      <div className="wholePage">
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
              <a href={this.state.loginLink}>
                <button className="logInButton" onClick={this.loginClick}>
                  Log In
                </button>
              </a>
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
        this.state.handleIsSle(jsonResponse.isSle);
        this.state.handleIsSupervisor(jsonResponse.isSupervisor);
        console.log(jsonResponse);
      });
  }
  createAccountClick() {
    console.log("somethingElse");
  }
}
export default Login;
