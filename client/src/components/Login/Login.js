import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
                <button className="logInButton" onClick={this.loginClick} >Log In</button>
              <button className="createAccountButton" onClick={this.createAccountClick}>Create Account</button>
              </div>  
            </div>
          /</div>
        /</div>
    );
  }

  loginClick() {
    console.log("In click function");
    var email = document.getElementById("email");
    var emailText = email.value;
    console.log(emailText);
    var password = document.getElementById("password");
    var passwordText = password.value;
    console.log(passwordText);
    fetch("/login", {
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
        console.log(jsonResponse);
      });
  }
  createAccountClick(e) {
    console.log("somethingElse");
  }
  
}


export default Login;
