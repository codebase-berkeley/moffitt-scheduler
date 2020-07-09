import React from "react";
import "./Employees.css";
import Modal from "react-modal";
import starImage from "./baseline_grade_white_18dp.png";
import { Redirect } from "react-router-dom";

class EachEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      redirect: null
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect(id) {
    console.log(id);
    this.setState({ redirect: "/profile/" + id });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    return (
      <div
        className="someEmployee"
        onClick={() => this.redirect(this.props.id)}
      >
        <div className="pleaseWork">
          <div class="holder"></div>
          <div className="vertical">
            <h2 className="name">{this.props.name}</h2>
            <h3 className="email">{this.props.email}</h3>
          </div>
        </div>
        <div className="lib">
          <div className={this.props.currentDisplayMoffitt3}>
            Moffitt 3 {this.props.moffitt3TrainingLevel}
          </div>
          <div className={this.props.currentDisplayMoffitt4}>
            Moffitt 4 {this.props.moffitt4TrainingLevel}
          </div>
          <div className={this.props.currentDisplayDoe}>
            Doe {this.props.doeTrainingLevel}
          </div>
        </div>
      </div>
    );
  }
}

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      modalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    fetch("/allemployeesupervisor", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.items === null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
          return;
        }
        this.setState({
          items: jsonResponse.items
        });
        console.log(this.state.items);
      });
  }
  processData(database) {
    const listItems = database.map((entry, index) => {
      if (entry.moffitt3TrainingLevel === 1) {
        entry.moffitt3TrainingLevel = <img src={starImage} />;
      } else if (entry.moffitt3TrainingLevel === 2) {
        entry.moffitt3TrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />
        ];
      } else {
        entry.moffitt3TrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />,
          <img src={starImage} />
        ];
      }
      if (entry.moffitt4TrainingLevel === 1) {
        entry.moffitt4TrainingLevel = <img src={starImage} />;
      } else if (entry.moffitt4TrainingLevel === 2) {
        entry.moffitt4TrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />
        ];
      } else {
        entry.moffitt4TrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />,
          <img src={starImage} />
        ];
      }
      if (entry.doeTrainingLevel === 1) {
        entry.doeTrainingLevel = <img src={starImage} />;
      } else if (entry.doeTrainingLevel === 2) {
        entry.doeTrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />
        ];
      } else {
        entry.doeTrainingLevel = [
          <img src={starImage} />,
          <img src={starImage} />,
          <img src={starImage} />
        ];
      }
      return (
        <EachEmployee
          name={entry.name}
          email={entry.email}
          moffitt3TrainingLevel={entry.moffitt3TrainingLevel}
          moffitt4TrainingLevel={entry.moffitt4TrainingLevel}
          doeTrainingLevel={entry.doeTrainingLevel}
          currentDisplayMoffitt3={entry.currentDisplayMoffitt3}
          currentDisplayMoffitt4={entry.currentDisplayMoffitt4}
          currentDisplayDoe={entry.currentDisplayDoe}
          id={entry.id}
        />
      );
    });
    return listItems;
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
    var lastName = document.getElementById("lastName");
    var lastNameText = lastName.value;
    var email = document.getElementById("email");
    var emailText = email.value;
    var moffitt3LevelNumber = parseInt(
      document.getElementById("moffitt3level").value
    );
    var moffitt4LevelNumber = parseInt(
      document.getElementById("moffitt4level").value
    );
    var doeLevelNumber = parseInt(document.getElementById("doelevel").value);
    fetch("/employees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstNameText,
        lastName: lastNameText,
        email: emailText,
        moffitt3Level: moffitt3LevelNumber,
        moffitt4Level: moffitt4LevelNumber,
        doeLevel: doeLevelNumber
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
    this.closeModal();
  }

  render() {
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

    return (
      <div>
        <div className="topWordss">
          {this.state.redirect}
          <div className="AddEmployee">
            <button className="AddButton" onClick={this.openModal}>
              + Add Employee
            </button>
            <div>
              <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <div className="AllText">
                  <h1 className="AddEmpText">Add Employee</h1>
                  <div className="EmployeeName">
                    <h3 className="FirstName">First Name</h3>
                    <h3 className="LastName">Last Name</h3>
                    <div className="addEmpModalInput">
                      <input className="FirstNameInput" id="firstName" />
                      <input className="LastNameInput" id="lastName" />
                    </div>
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
        {this.processData(this.state.items)}
      </div>
    );
  }
}
export default Employees;
