import React from "react";
import "./Login.css";

function Login(props) {
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
              <form>
                <input type="text" placeholder="Email"></input>
              </form>
            </div>
          </div>
          <div className="passwordBox">
            <div className="password">
              <form>
                <input type="text" placeholder="Password"></input>
              </form>
            </div>
          </div>
          <div className="button-container">
            <div className="logInButton">
              <div className="logInHover">
                <div className="logInButtonText">
                  <h4>Log In</h4>
                </div>
              </div>
            </div>
            <div className="createAccountButton">
              <div className="createAccountButtonText">
                <h4>Create Account</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loginBoxSurroundings"></div>
    </div>
  );
}
export default Login;
