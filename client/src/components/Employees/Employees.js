import React from "react";
import "./Employees.css";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";

function Training(props) {
  var className = props.name.replace(" ", "").toLowerCase() + "-badge";
  return (
    <div className={"badge " + className}>
      <p>{props.name}</p>
    </div>
  );
}

function Employee(props) {
  var workleader = props.workleader ? " *" : null;

  var trainings = [];
  for (var i = 0; i < props.trainings.length; i++) {
    trainings.push(<Training key={i} name={props.trainings[i]} />);
  }

  return (
    <a className="employee-link" href={"/supsleprofile/" + props.id}>
      <div className="employee">
        <div className="identity">
          <h2>
            {props.name}
            {workleader}
          </h2>
          <h3 className="email">{props.email}</h3>
        </div>

        <div className="badges">{trainings}</div>
      </div>
    </a>
  );
}

var customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "500px",
    height: "400px",
    transform: "translate(-50%, -50%)",
    overflow: 0
  }
};

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], modalOpen: false, supModalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.openSupModal = this.openSupModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeSupModal = this.closeSupModal.bind(this);
    this.makeEmployee = this.makeEmployee.bind(this);
    this.getAddEmployeeModal = this.getAddEmployeeModal.bind(this);

    this.addEmployeeClick = this.addEmployeeClick.bind(this);
    this.addSupervisorClick = this.addSupervisorClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/employees", {
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.noAuth) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        } else {
          this.setState({ employees: jsonResponse.employees });
        }
      });
  }

  makeEmployee(e) {
    var trainings = [];
    if (e.quizzes) {
      trainings.push("Quizzes");
    }
    if (e.maindesk) {
      trainings.push("Main Desk");
    }
    if (e.moffitt3) {
      trainings.push("Moffitt 3");
    }
    if (e.moffitt4) {
      trainings.push("Moffitt 4");
    }
    if (e.psert) {
      trainings.push("P-SERT");
    }

    return (
      <Employee
        id={e.id}
        key={e.id}
        name={e.name}
        email={e.email}
        workleader={e.workleader}
        notes={e.notes}
        trainings={trainings}
      />
    );
  }

  addEmployeeClick() {
    var name = document.getElementById("user-name").value;
    var email = document.getElementById("user-email").value;

    var workleader =
      document.querySelector('input[name="add-workleader"]:checked').value ===
      "yes";

    var quizzes = document.getElementById("add-quizzes").checked;
    var maindesk = document.getElementById("add-maindesk").checked;
    var moffitt3 = document.getElementById("add-moffitt3").checked;
    var moffitt4 = document.getElementById("add-moffitt4").checked;
    var psert = document.getElementById("add-psert").checked;

    var notes = document.getElementById("add-notes").value;

    fetch("/api/addemployee", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        workleader: workleader,
        quizzes: quizzes,
        maindesk: maindesk,
        moffitt3: moffitt3,
        moffitt4: moffitt4,
        psert: psert,
        notes: notes
      })
    }).then(_ => {
      this.closeModal();
      alert(
        'The new employee\'s password is "temporary". The employee should change this password the first time they log in.'
      );
      window.location.reload(false);
    });
  }

  addSupervisorClick() {
    var name = document.getElementById("user-name").value;
    var email = document.getElementById("user-email").value;

    fetch("/api/addsupervisor", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(response => {
      this.closeSupModal();
      alert(
        'The new supervisor\'s password is "temporary". The employee should change this password the first time they log in.'
      );
    });
  }

  getAddEmployeeModal() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <div className="add-employee-form">
          <h1>Add Employee</h1>
          <table className="add-employee-info">
            <tbody>
              <tr>
                <td>
                  <h4>Name:</h4>
                </td>
                <td>
                  <input id="user-name" type="text" name="name" />
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Email:</h4>
                </td>
                <td>
                  <input id="user-email" type="text" name="email" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="workleader-buttons">
            <h4>Workleader:</h4>
            <input type="radio" name="add-workleader" value="yes" />
            <label className="workleader-yes-label">Yes</label>
            <input
              type="radio"
              name="add-workleader"
              value="no"
              defaultChecked
            />
            <label>No</label>
          </div>
          <h4>Trainings:</h4>
          <div className="train-cols">
            <br />
            <div className="train-col">
              Desk Quizzes <input type="checkbox" id="add-quizzes" />
              <br />
              Main Desk <input type="checkbox" id="add-maindesk" /> <br />
              Moffitt 3<input type="checkbox" id="add-moffitt3" /> <br />
            </div>
            <div className="train-col right">
              Moffitt 4 <input type="checkbox" id="add-moffitt4" /> <br />
              P-SERT <input type="checkbox" id="add-psert" />
            </div>
          </div>
          <div className="notes">
            <h4>Notes:</h4>
            <textarea id="add-notes" />
          </div>

          <div className="add-employee-buttons">
            <button className="profile-button" onClick={this.addEmployeeClick}>
              Add Employee
            </button>
            <button onClick={this.closeModal} className="profile-button">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  getAddSupervisorModal() {
    return (
      <Modal
        isOpen={this.state.supModalOpen}
        onRequestClose={this.closeSupModal}
        style={customStyles}
      >
        <div className="add-employee-form">
          <h1>Add Supervisor</h1>
          <table className="add-employee-info">
            <tbody>
              <tr>
                <td>
                  <h4>Name:</h4>
                </td>
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
                <td>
                  <h4>Email:</h4>
                </td>
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
          <div className="add-sup-buttons">
            <button
              className="profile-button"
              onClick={this.addSupervisorClick}
            >
              Add Supervisor
            </button>
            <button onClick={this.closeSupModal} className="profile-button">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    var employees = [];
    for (var i = 0; i < this.state.employees.length; i++) {
      employees.push(this.makeEmployee(this.state.employees[i]));
    }
    return (
      <div className="employees-page">
        {this.state.redirect}
        <div className="employee-top-bar">
          <h4 className="star">* indicates the employee is a workleader</h4>
          <button
            className="add-button profile-button"
            onClick={this.openModal}
          >
            Add Employee
          </button>
          <button
            className="add-button profile-button"
            onClick={this.openSupModal}
          >
            Add Supervisor
          </button>
        </div>
        {this.getAddEmployeeModal()}
        {this.getAddSupervisorModal()}
        <div className="employees-list">{employees}</div>
      </div>
    );
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  openSupModal() {
    this.setState({ supModalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  closeSupModal() {
    this.setState({ supModalOpen: false });
  }
}
export default Employees;
