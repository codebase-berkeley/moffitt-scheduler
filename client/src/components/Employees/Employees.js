import React from "react";
import "./Employees.css";
import EachEmployee from "./EachEmployee.js";
import Modal from "react-modal";

export default class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      modalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitClick = this.submitClick.bind(this);
    // this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    //Do this
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  submitClick() {
    var firstName = document.getElementById("firstName");
    var firstNameText = firstName.value;
    console.log(firstNameText);
    var lastName = document.getElementById("lastName");
    var lastNameText = lastName.value;
    console.log(lastNameText);
    var email = document.getElementById("email");
    var emailText = email.value;
    console.log(emailText);
    var moffitt3LevelNumber = parseInt(
      document.getElementById("moffitt3level").value
    );
    var moffitt4LevelNumber = parseInt(
      document.getElementById("moffitt4level").value
    );
    var doeLevelNumber = parseInt(document.getElementById("doelevel").value);
    fetch("http://localhost:8000/employees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameText,
        lastName: lastNameText,
        email: emailText,
        moffitt3Level: moffitt3LevelNumber,
        moffitt4Level: moffitt4LevelNumber,
        doeLevel: doeLevelNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
    this.closeModal();
  }

  // cancelClick() {
  //   console.log("doesNothingForNow");
  // }

  render() {
    var customStyles = {
      content: {
        top: "400px",
        left: "50%",
        width: "500px",
        height: "400px",
        transform: "translate(-50%, -50%)",
        overflow: 0,
      },
    };

    return (
      <div>
        <div className="topWordss">
          <h1 className="header">Employees</h1>
          <div className="AddEmployee">
            <button className="AddButton" onClick={this.openModal}>
              + Add Employee
            </button>
            <div>
              <Modal
                // className="box"
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <div className="AllText">
                  <h1
                    className="AddEmpText"
                    //   ref={(_subtitle) => (subtitle = _subtitle)}
                  >
                    Add Employee
                  </h1>
                  <div className="EmployeeName">
                    <h3 className="FirstName">First Name</h3>
                    <h3 className="LastName">Last Name</h3>
                    <input className="FirstNameInput" id="firstName" />
                    <input className="LastNameInput" id="lastName" />
                  </div>
                  <div className="EmployeeEmail">
                    <h3 className="Email">Email</h3>
                    <input className="EmailInput" id="email" />
                  </div>
                  <h3 className="TrainedFor">Training Levels</h3>
                  <div className="EmployeeName">
                    <div className="libleveltext">
                      <div className="vertalign">
                        <h3 className="FirstName">Moffitt 3</h3>
                        <select id="moffitt3level">
                          <option value="0">0 - No Training</option>
                          <option value="1">1 - Training</option>
                          <option value="2">2 - Desk (Fully Trained) </option>
                          <option value="3">3 - Workleader</option>
                        </select>
                      </div>
                      <div className="vertalign">
                        <h3 className="FirstName">Moffitt 4</h3>
                        <select id="moffitt4level">
                          <option value="0">0 - No Training</option>
                          <option value="1">1 - Training</option>
                          <option value="2">2 - Desk (Fully Trained) </option>
                          <option value="3">3 - Workleader</option>
                        </select>
                      </div>
                      <div className="vertalign">
                        <h3 className="FirstName">Doe</h3>
                        <select id="doelevel">
                          <option value="0">0 - No Training</option>
                          <option value="1">1 - Training</option>
                          <option value="2">2 - Desk (Fully Trained) </option>
                          <option value="3">3 - Workleader</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <a href="/employees">
                    <button className="CancelButton">
                      <div className="CancelHover">
                        <div className="CancelText">
                          <h4> Cancel</h4>
                        </div>
                      </div>
                    </button>
                  </a>
                  <button className="SubmitButton" onClick={this.submitClick}>
                    <div className="SubmitText">
                      <h4>Submit</h4>
                    </div>
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <EachEmployee
          name="Sahil Thakur"
          email="sahilthakur@berkeley.edu"
          moffitt3TrainingLevel="1"
          moffitt4TrainingLevel="2"
          doeTrainingLevel="3"
        />
        <EachEmployee
          name="Brian DeLeonardis"
          email="bdeleonardis@berkeley.edu"
          moffitt3TrainingLevel="1"
          moffitt4TrainingLevel="2"
          doeTrainingLevel="3"
        />
        <EachEmployee
          name="Bianca Lee"
          email="biancalee@berkeley.edu"
          moffitt3TrainingLevel="1"
          moffitt4TrainingLevel="2"
          doeTrainingLevel="4"
        />
      </div>
    );
  }
}
