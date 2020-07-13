import React from "react";

import "./EmployeeProfile.css";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      workleader: null,
      notes: null,
      maindesk: null,
      moffitt3: null,
      moffitt4: null,
      psert: null,
      quizzes: null,
      sup_view: null,
      editing: false,
      change_password: false,
      wrong_password: false,
      redirect: null
    };

    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);

    this.normalView = this.normalView.bind(this);
    this.getFixedCheckbox = this.getFixedCheckbox.bind(this);
    this.getRegularCheckbox = this.getRegularCheckbox.bind(this);

    this.userEditClick = this.userEditClick.bind(this);
    this.supEditClick = this.supEditClick.bind(this);
    this.userPasswordClick = this.userPasswordClick.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  componentDidMount() {
    var url = "/sleprofile";
    if (this.props.userId) {
      url += "/" + this.props.userId;
    }

    fetch(url, {
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          name: json.name,
          email: json.email,
          workleader: json.workleader,
          notes: json.notes,
          maindesk: json.maindesk,
          moffitt3: json.moffitt3,
          moffitt4: json.moffitt4,
          psert: json.psert,
          quizzes: json.quizzes,
          sup_view: json.sup_view
        });
      });
  }

  getFixedCheckbox(name) {
    if (this.state[name]) {
      return <input class={name} type="checkbox" checked disabled="disabled" />;
    }
    return <input class={name} type="checkbox" disabled="disabled" />;
  }

  getRegularCheckbox(name) {
    if (this.state[name]) {
      return <input class={name} id={name} type="checkbox" checked />;
    }
    return <input class={name} id={name} type="checkbox" />;
  }

  normalView() {
    var workleader = null;
    if (this.state.workleader) {
      workleader = <h3>Not a workleader</h3>;
    } else {
      workleader = <h3>Workleader</h3>;
    }

    return (
      <div class="sle-profile-page">
        <div class="info">
          <h1>{this.state.name}</h1>
          <h2>{this.state.email}</h2>
          {workleader}
          <p>Notes: {this.state.notes}</p>
        </div>
        <div class="train">
          <h2>Training information:</h2>
          <div class="train-cols">
            <div class="train-col">
              Desk Quizzes {this.getFixedCheckbox("quizzes")} <br />
              Main Desk {this.getFixedCheckbox("maindesk")} <br />
              Moffitt 3 {this.getFixedCheckbox("moffitt3")} <br />
            </div>
            <div class="train-col right">
              Moffitt 4 {this.getFixedCheckbox("moffitt4")} <br />
              P-SERT {this.getFixedCheckbox("psert")}
            </div>
          </div>
        </div>

        <div class="normal-view-buttons">
          <button
            class={
              "profile-button " +
              (this.state.sup_view ? "sup-edit-button" : "none")
            }
            onClick={() => this.setState({ editing: true })}
          >
            Edit Profile
          </button>
          {!this.state.sup_view && (
            <button
              class="profile-button"
              onClick={() => this.setState({ change_password: true })}
            >
              Change Password
            </button>
          ) /* Only the employee can change their password */}
        </div>
      </div>
    );
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  userEditClick() {
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

  supEditClick() {
    var workleader =
      document.querySelector('input[name="workleader"]:checked').value ===
      "yes";

    var quizzes = document.getElementById("quizzes").checked;
    var maindesk = document.getElementById("maindesk").checked;
    var moffitt3 = document.getElementById("moffitt3").checked;
    var moffitt4 = document.getElementById("moffitt4").checked;
    var psert = document.getElementById("psert").checked;

    var notes = document.getElementById("notes").value;

    fetch("/supeditsle", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workleader: workleader,
        quizzes: quizzes,
        maindesk: maindesk,
        moffitt3: moffitt3,
        moffitt4: moffitt4,
        psert: psert,
        notes: notes
      })
    }).then(response => {
      this.setState({ editing: false });
    });
  }

  userPasswordClick() {
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

  userEditView() {
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
            onClick={this.userEditClick}
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

  supEditView() {
    return (
      <div class="sle-profile-page sup-edit-view">
        <h1>Edit Training</h1>
        <div class="workleader">
          <h2>Workleader:</h2>
          <input
            type="radio"
            name="workleader"
            id="workleader-yes"
            value="yes"
          />
          <label class="yes-label">Yes</label>
          <input type="radio" name="workleader" id="workleader-no" value="no" />
          <label>No</label>
        </div>
        <div>
          <h2>Training information:</h2>
          <div class="train-cols">
            <div class="train-col">
              Desk Quizzes {this.getRegularCheckbox("quizzes")} <br />
              Main Desk {this.getRegularCheckbox("maindesk")} <br />
              Moffitt 3 {this.getRegularCheckbox("moffitt3")} <br />
            </div>
            <div class="train-col right">
              Moffitt 4 {this.getRegularCheckbox("moffitt4")} <br />
              P-SERT {this.getRegularCheckbox("psert")}
            </div>
          </div>
        </div>
        <div class="notes">
          <h2>Notes:</h2>
          <textarea name="notes" id="notes" value={this.state.notes} />
        </div>
        <div class="sup-edit-buttons">
          <button onClick={this.supEditClick} class="profile-button">
            Save Changes
          </button>
          <button
            class="profile-button"
            onClick={() => this.setState({ editing: false })}
          >
            Cancel
          </button>
          <br />
          <button className="delete-button sup-sle-delete">Delete SLE</button>
        </div>
      </div>
    );
  }

  changePassword() {
    return (
      <div class="sle-profile-page">
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
            onClick={this.userPasswordClick}
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
    if (this.state.change_password) {
      return this.changePassword();
    }

    if (this.state.editing) {
      if (this.state.sup_view) {
        return this.supEditView();
      }
      return this.userEditView();
    }

    return this.normalView();
  }
}

export default Profile;
