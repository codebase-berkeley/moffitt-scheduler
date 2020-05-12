import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsSle = this.handleIsSle.bind(this);
    this.handleIsSupervisor = this.handleIsSupervisor.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.state = { redirect: null, isError: false };
  }
  componentDidMount() {
    fetch("/logout", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("Session/Cookies cleared");
      });
  }
  handleIsSle = (resp) => {
    if (resp != null && resp != undefined) {
      var linkString = `/yourshifts`;
      this.setState({ redirect: <Redirect push to={linkString} /> });
    }
  };

  handleIsSupervisor = (resp) => {
    if (resp) {
      this.setState({ redirect: <Redirect push to="/masterschedule" /> });
    }
  };

  render() {
    let isError = this.state.isError;
    let displayError;
    if (isError == true) {
      displayError = this.errorBox();
    }

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
            <div className="error">{displayError}</div>
            <div className="emailBox">
              <div className="email">
                <input type="text" placeholder="Email" id="email"></input>
              </div>
            </div>
            <div className="passwordBox">
              <input
                type="password"
                placeholder="Password"
                id="password"
              ></input>
            </div>
            <div className="loginButtons">
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
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: emailText, password: passwordText }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.isSle === null) {
          if (
            jsonResponse.isSupervisor == null ||
            jsonResponse.isSupervisor == false
          ) {
            this.setState({ isError: true });
          }
        } else if (jsonResponse.isSupervisor === false) {
          if (jsonResponse.isSle == null) {
            this.setState({ isError: true });
          }
        }
        if (jsonResponse.isSle) {
          this.handleIsSle(jsonResponse.id);
        } else {
          this.handleIsSupervisor(jsonResponse.isSupervisor);
        }
        console.log(jsonResponse);
      });
  }
  createAccountClick() {
    console.log("somethingElse");
  }

  errorBox() {
    return (
      <div className="errorBox">
        <div className="errorMsg">
          <h1>Incorrect email or password. Please try again.</h1>
        </div>
      </div>
    );
  }
}
export default Login;
