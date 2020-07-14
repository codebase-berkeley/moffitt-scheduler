import React from "react";

import "./EmployeeProfile.css";
import { Redirect } from "react-router-dom";

class SupervisorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      editing: false,
      change_password: false,
      redirect: null
    };

    this.editClick = this.editClick.bind(this);
    this.passwordClick = this.passwordClick.bind(this);

    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);

    this.normalView = this.normalView.bind(this);
    this.editView = this.editView.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  componentDidMount() {
    fetch("/supprofile", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.noAuth) {
          this.setState({ redirect: <Redirect to="/login" /> });
        }
        this.setState({ name: json.name, email: json.email });
      });
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  editClick() {
    fetch("/sleedit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ name: this.state.name, email: this.state.email })
    }).then(response => {
      this.setState({ editing: false });
    });
  }

  passwordClick() {
    var password = document.getElementById("user-password").value;
    var confirm = document.getElementById("user-confirm").value;

    if (password !== confirm) {
      this.setState({ wrong_password: true });
      return;
    }

    fetch("/changepassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ password: password })
    }).then(_ => {
      this.setState({ change_password: false, wrong_password: false });
    });
  }

  deleteSelf() {
    fetch("/deleteself", { method: "POST", credentials: "include" }).then(_ => {
      this.setState({ redirect: <Redirect push to="/login" /> });
    });
  }

  normalView() {
    return (
      <div class="sle-profile-page">
        {this.state.redirect}
        <div class="info">
          <h1>{this.state.name}</h1>
          <h2>{this.state.email}</h2>
        </div>
        <div class="normal-view-buttons">
          <button
            class="profile-button"
            onClick={() => this.setState({ editing: true })}
          >
            Edit Profile
          </button>
          <button
            class="profile-button"
            onClick={() => this.setState({ change_password: true })}
          >
            Change Password
          </button>
        </div>
      </div>
    );
  }

  editView() {
    console.log("In editView");
    return (
      <div class="sle-profile-page">
        {this.state.redirect}
        <h1>Edit Profile</h1>
        <table class="user-profile-form">
          <tr>
            <td>Name:</td>
            <td>
              <input
                id="user-name"
                type="text"
                name="name"
                onChange={this.setName}
                value={this.state.name}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                id="user-email"
                type="text"
                name="email"
                onChange={this.setEmail}
                value={this.state.email}
              />
            </td>
          </tr>
        </table>
        <div class="user-edit-buttons">
          <button
            class="profile-button user-edit-button"
            onClick={this.editClick}
          >
            Save Changes
          </button>
          <button
            class="profile-button user-edit-button"
            onClick={() => this.setState({ editing: false })}
          >
            Cancel
          </button>
          <br />
          <button class="delete-button user-delete" onClick={this.deleteSelf}>
            Delete SLE
          </button>
        </div>
      </div>
    );
  }

  changePassword() {
    console.log("In changePassword");
    return (
      <div class="sle-profile-page">
        {this.state.redirect}
        <h1>Change Password</h1>
        <table class="user-password-form">
          <tbody>
            <tr>
              <td>
                <label>New Password:</label>
              </td>
              <td>
                <input name="password" type="password" id="user-password" />
              </td>
            </tr>
            <tr>
              <td>
                <label>Confirm Password:</label>
              </td>
              <td>
                <input name="confirm" type="password" id="user-confirm" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="user-password-buttons">
          <button
            class="profile-button user-password-button"
            onClick={this.passwordClick}
          >
            Save Password
          </button>
          <button
            class="profile-button user-password-button"
            onClick={() => this.setState({ change_password: false })}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render() {
    console.log("this.state", this.state);
    if (this.state.change_password) {
      console.log("In the if");
      return this.changePassword();
    }

    if (this.state.editing) {
      return this.editView();
    }

    return this.normalView();
  }
}

export default SupervisorProfile;
