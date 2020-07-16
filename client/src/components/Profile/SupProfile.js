import React from "react";

import "./EmployeeProfile.css";
import { Redirect } from "react-router-dom";

import Modal from "react-modal";

var modalStyles = {
  content: {
    position: "absolute",
    top: "200px",
    left: "50%",
    width: "400px",
    height: "200px",
    transform: "translate(-50%, -50%)",
    "padding-left": "5px",
    "background-color": "white",
    overflow: 0
  }
};

class SupervisorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      editing: false,
      change_password: false,
      redirect: null,
      delete_modal: false,
      dif_pwd: null
    };

    this.editClick = this.editClick.bind(this);
    this.passwordClick = this.passwordClick.bind(this);

    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);

    this.normalView = this.normalView.bind(this);
    this.editView = this.editView.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);

    this.getDeleteModal = this.getDeleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch("/api/supprofile", { credentials: "include" })
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
    fetch("/api/sleedit", {
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
      var errorBox = (
        <div className="error-pwd">
          <p>The passwords you entered are not the same.</p>
        </div>
      );
      this.setState({ dif_pwd: errorBox });
      return;
    } else {
      this.setState({ dif_pwd: null });
    }

    fetch("/api/changepassword", {
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
    fetch("/api/deleteself", { method: "POST", credentials: "include" }).then(
      _ => {
        this.setState({ redirect: <Redirect push to="/login" /> });
      }
    );
  }

  normalView() {
    return (
      <div className="sle-profile-page">
        {this.state.redirect}
        <div className="info">
          <h1>{this.state.name}</h1>
          <h2>{this.state.email}</h2>
        </div>
        <div className="normal-view-buttons">
          <button
            className="profile-button"
            onClick={() => this.setState({ editing: true })}
          >
            Edit Profile
          </button>
          <button
            className="profile-button"
            onClick={() => this.setState({ change_password: true })}
          >
            Change Password
          </button>
        </div>
      </div>
    );
  }

  closeModal() {
    this.setState({ delete_modal: false });
  }

  getDeleteModal() {
    return (
      <Modal
        isOpen={this.state.delete_modal}
        onRequestClose={this.closeModal}
        style={modalStyles}
        className="self-modal"
      >
        <h2>Are you sure you want to delete your account?</h2>
        <h2>This is a permanent operation.</h2>
        <div className="modal-buttons">
          <button className="profile-button" onClick={this.closeModal}>
            No
          </button>
          <button className="profile-button" onClick={this.deleteSelf}>
            Yes
          </button>
        </div>
      </Modal>
    );
  }

  editView() {
    return (
      <div className="sle-profile-page">
        {this.state.redirect}
        {this.getDeleteModal()}
        <h1>Edit Profile</h1>
        <table className="user-profile-form">
          <tbody>
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
          </tbody>
        </table>
        <div className="user-edit-buttons">
          <button
            className="profile-button user-edit-button"
            onClick={this.editClick}
          >
            Save Changes
          </button>
          <button
            className="profile-button user-edit-button"
            onClick={() => this.setState({ editing: false })}
          >
            Cancel
          </button>
          <br />
          <button
            className="delete-button user-delete"
            onClick={() => {
              this.setState({ delete_modal: true });
            }}
          >
            Delete Your Account
          </button>
        </div>
      </div>
    );
  }

  changePassword() {
    return (
      <div className="sle-profile-page">
        {this.state.redirect}
        <h1>Change Password</h1>
        {this.state.dif_pwd}
        <table className="user-password-form">
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
        <div className="user-password-buttons">
          <button
            className="profile-button user-password-button"
            onClick={this.passwordClick}
          >
            Save Password
          </button>
          <button
            className="profile-button user-password-button"
            onClick={() =>
              this.setState({ change_password: false, dif_pwd: null })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.change_password) {
      return this.changePassword();
    }

    if (this.state.editing) {
      return this.editView();
    }

    return this.normalView();
  }
}

export default SupervisorProfile;
