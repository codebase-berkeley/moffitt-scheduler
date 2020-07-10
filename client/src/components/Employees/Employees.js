import React from "react";
import "./Employees.css";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";

function Training(props) {
  var className = props.name.replace(" ", "").toLowerCase() + "-badge";
  return (
    <div class={"badge " + className}>
      <p>{props.name}</p>
    </div>
  );
}

function Employee(props) {
  var workleader = props.workleader ? " *" : null;

  var trainings = [];
  for (var i = 0; i < props.trainings.length; i++) {
    trainings.push(<Training name={props.trainings[i]} />);
  }

  return (
    <div class="employee">
      <div class="identity">
        <h2>
          {props.name}
          {workleader}
        </h2>
        <h3 class="email">{props.email}</h3>
      </div>

      <div class="badges">{trainings}</div>
    </div>
  );
}

var customStyles = {
  content: {
    top: "400px",
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
    this.state = {
      employees: [],
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.makeEmployee = this.makeEmployee.bind(this);
  }

  componentDidMount() {
    fetch("/employees", {
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log("Employees", jsonResponse);
        if (jsonResponse.items === null) {
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
    if (e.main) {
      trainings.push("Main");
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
        name={e.name}
        email={e.email}
        workleader={e.workleader}
        notes={e.notes}
        trainings={trainings}
      />
    );
  }

  render() {
    var employees = [];
    for (var i = 0; i < this.state.employees.length; i++) {
      employees.push(this.makeEmployee(this.state.employees[i]));
    }
    return (
      <div className="employees-page">
        <div class="star-container">
          <h4 class="star">* indicates the employee is a workleader</h4>
        </div>
        {this.state.redirect}
        {/* <div className="add-employee">
          <button className="add-button" onClick={this.openModal}>
            Add Employee
          </button>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <p>I'm a modal</p>
          </Modal>
        </div> */}
        <div className="employees-list">{employees}</div>
      </div>
    );
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
}
export default Employees;
