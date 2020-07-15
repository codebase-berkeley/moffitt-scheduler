import React from "react";

import "./EmployeeProfile.css";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

var modalStyles = {
  content: {
    top: "200px",
    left: "50%",
    width: "400px",
    height: "200px",
    transform: "translate(-50%, -50%)",
    overflow: 0
  }
};

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
      self_modal: false,
      sle_modal: false,
      redirect: null,
      dif_pwd: null
    };

    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.setWorkleader = this.setWorkleader.bind(this);
    this.setTrainings = this.setTrainings.bind(this);

    this.normalView = this.normalView.bind(this);
    this.getFixedCheckbox = this.getFixedCheckbox.bind(this);
    this.getRegularCheckbox = this.getRegularCheckbox.bind(this);

    this.userEditClick = this.userEditClick.bind(this);
    this.supEditClick = this.supEditClick.bind(this);
    this.userPasswordClick = this.userPasswordClick.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
    this.supDeleteSle = this.supDeleteSle.bind(this);

    this.closeSelfModal = this.closeSelfModal.bind(this);
    this.closeSleModal = this.closeSleModal.bind(this);
    this.getDeleteSelfModal = this.getDeleteSelfModal.bind(this);
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
      return (
        <input
          className={name}
          type="checkbox"
          defaultChecked
          disabled="disabled"
        />
      );
    }
    return <input className={name} type="checkbox" disabled="disabled" />;
  }

  getRegularCheckbox(name) {
    return (
      <input
        name={name}
        onChange={this.setTrainings}
        className={name}
        id={name}
        type="checkbox"
        checked={this.state[name]}
      />
    );
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  setNotes(e) {
    this.setState({ notes: e.value });
  }

  setWorkleader(e) {
    if (e.target.value === "yes") {
      this.setState({ workleader: true });
    } else {
      this.setState({ workleader: false });
    }
  }

  setTrainings(e) {
    var name = e.target.name;
    var isChecked = e.target.checked;
    var obj = {};
    obj[name] = isChecked;

    this.setState(obj);
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

    var notes = document.getElementById("profile-notes").value;
    this.setState({ notes: notes });

    fetch("/supeditsle", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.userId,
        workleader: workleader,
        quizzes: quizzes,
        maindesk: maindesk,
        moffitt3: moffitt3,
        moffitt4: moffitt4,
        psert: psert,
        notes: notes
      })
    }).then(_ => {
      this.setState({ editing: false });
    });
  }

  userPasswordClick() {
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

  supDeleteSle() {
    fetch("/supdeletesle", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: this.props.userId })
    })
      .then(response => {
        return response.json();
      })
      .then(_ => {
        this.setState({ redirect: <Redirect to="/employees" /> });
      });
  }

  normalView() {
    var workleader = null;
    if (this.state.workleader) {
      workleader = <h3>Workleader</h3>;
    } else {
      workleader = <h3>Not a workleader</h3>;
    }

    return (
      <div className="sle-profile-page">
        <div className="info">
          <h1>{this.state.name}</h1>
          <h2>{this.state.email}</h2>
          {workleader}
          <p>Notes: {this.state.notes}</p>
        </div>
        <div className="train">
          <h2>Training information:</h2>
          <div className="train-cols">
            <div className="train-col">
              Desk Quizzes {this.getFixedCheckbox("quizzes")} <br />
              Main Desk {this.getFixedCheckbox("maindesk")} <br />
              Moffitt 3 {this.getFixedCheckbox("moffitt3")} <br />
            </div>
            <div className="train-col right">
              Moffitt 4 {this.getFixedCheckbox("moffitt4")} <br />
              P-SERT {this.getFixedCheckbox("psert")}
            </div>
          </div>
        </div>

        <div className="normal-view-buttons">
          <button
            className={
              "profile-button " +
              (this.state.sup_view ? "sup-edit-button" : "none")
            }
            onClick={() => this.setState({ editing: true })}
          >
            Edit Profile
          </button>
          {!this.state.sup_view && (
            <button
              className="profile-button"
              onClick={() => this.setState({ change_password: true })}
            >
              Change Password
            </button>
          ) /* Only the employee can change their password */}
        </div>
      </div>
    );
  }

  closeSelfModal() {
    this.setState({ self_modal: false });
  }

  closeSleModal() {
    this.setState({ sle_modal: false });
  }

  getDeleteSelfModal() {
    return (
      <Modal
        isOpen={this.state.self_modal}
        onRequestClose={this.closeSelfModal}
        style={modalStyles}
        className="self-modal"
      >
        <h2>Are you sure you want to delete your account?</h2>
        <h2>This is a permanent operation.</h2>
        <div className="modal-buttons">
          <button
            className="profile-button"
            onClick={() => this.setState({ self_modal: false })}
          >
            No
          </button>
          <button className="profile-button" onClick={this.deleteSelf}>
            Yes
          </button>
        </div>
      </Modal>
    );
  }

  getDeleteSleModal() {
    return (
      <Modal
        isOpen={this.state.sle_modal}
        onRequestClose={this.closeSleModal}
        style={modalStyles}
        className="self-modal"
      >
        <h2>Are you sure you want to delete this SLE account?</h2>
        <h2>This is a permanent operation.</h2>
        <div className="modal-buttons">
          <button
            className="profile-button"
            onClick={() => this.setState({ sle_modal: false })}
          >
            No
          </button>
          <button className="profile-button" onClick={this.supDeleteSle}>
            Yes
          </button>
        </div>
      </Modal>
    );
  }

  userEditView() {
    return (
      <div className="sle-profile-page">
        {this.state.redirect}
        {this.getDeleteSelfModal()}
        <div>
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
              onClick={this.userEditClick}
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
              onClick={() => this.setState({ self_modal: true })}
            >
              Delete SLE
            </button>
          </div>
        </div>
      </div>
    );
  }

  getWorkleaderButtons() {
    var yesButton = null;
    var noButton = null;

    if (this.state.workleader) {
      yesButton = (
        <input
          type="radio"
          name="workleader"
          id="workleader-yes"
          value="yes"
          defaultChecked
        />
      );

      noButton = (
        <input type="radio" name="workleader" id="workleader-no" value="no" />
      );
    } else {
      yesButton = (
        <input type="radio" name="workleader" id="workleader-yes" value="yes" />
      );

      noButton = (
        <input
          type="radio"
          name="workleader"
          id="workleader-no"
          value="no"
          defaultChecked
        />
      );
    }

    return (
      <div onChange={this.setWorkleader} className="workleader">
        <h2>Workleader:</h2>
        {yesButton}
        <label className="yes-label">Yes</label>
        {noButton}
        <label>No</label>
      </div>
    );
  }

  supEditView() {
    return (
      <div className="sle-profile-page sup-edit-view">
        {this.state.redirect}
        {this.getDeleteSleModal()}
        <h1>Edit Training for {this.state.name}</h1>
        <div>
          {this.getWorkleaderButtons()}
          <h2>Training information:</h2>
          <div className="train-cols">
            <div className="train-col">
              Desk Quizzes {this.getRegularCheckbox("quizzes")} <br />
              Main Desk {this.getRegularCheckbox("maindesk")} <br />
              Moffitt 3 {this.getRegularCheckbox("moffitt3")} <br />
            </div>
            <div className="train-col right">
              Moffitt 4 {this.getRegularCheckbox("moffitt4")} <br />
              P-SERT {this.getRegularCheckbox("psert")}
            </div>
          </div>
        </div>
        <div className="notes">
          <h2>Notes:</h2>
          <textarea
            name="notes"
            id="profile-notes"
            onChange={this.setNotes}
            value={this.state.notes}
          />
        </div>
        <div className="sup-edit-buttons">
          <button onClick={this.supEditClick} className="profile-button">
            Save Changes
          </button>
          <button
            className="profile-button"
            onClick={() => this.setState({ editing: false })}
          >
            Cancel
          </button>
          <br />
          <button
            onClick={() => this.setState({ sle_modal: true })}
            className="delete-button sup-sle-delete"
          >
            Delete SLE
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
            onClick={this.userPasswordClick}
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
      if (this.state.sup_view) {
        return this.supEditView();
      }
      return this.userEditView();
    }

    return this.normalView();
  }
}

export default Profile;
