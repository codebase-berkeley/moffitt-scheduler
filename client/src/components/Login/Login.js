import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.enterPress = this.enterPress.bind(this);
    this.state = { redirect: null, isError: false };
  }

  render() {
    let displayError;
    if (this.state.isError === true) {
      displayError = <ErrorBox />;
    }

    return (
      <div className="wholePage">
        {this.state.redirect}
        <div className="loginBox" onKeyDown={this.enterPress}>
          <h1>Login</h1>
          <div className="error">{displayError}</div>

          <input type="text" placeholder="Email" id="email"></input>
          <input type="password" placeholder="Password" id="password"></input>

          <div className="loginButtons">
            <button className="logInButton" onClick={this.loginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  enterPress(e) {
    if (e.keyCode === 13) {
      this.loginClick();
    }
  }

  loginClick() {
    var emailText = document.getElementById("email").value;
    var passwordText = document.getElementById("password").value;
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: emailText, password: passwordText })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.isSle) {
          document.cookie += "id=" + jsonResponse.id;
          this.setState({ redirect: <Redirect push to="/yourshifts" /> });
        } else if (jsonResponse.isSupervisor) {
          this.setState({ redirect: <Redirect push to="/masterschedule" /> });
        } else {
          this.setState({ isError: true });
        }
      });
  }
}

function ErrorBox(props) {
  return (
    <div className="errorBox">
      <div className="errorMsg">
        <p>Incorrect email or password. Please try again.</p>
      </div>
    </div>
  );
}

export default Login;
