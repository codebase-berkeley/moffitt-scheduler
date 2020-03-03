import React from "react";
import "./Employees.css";
import EachEmployee from "./EachEmployee.js";
import Modal from "react-modal";

function AddEmployee() {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#black";
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);

  var subtitle;

  const customStyles = {
    content: {
      top: "400px",
      left: "50%",
      width: "450px",
      height: "400px",
      transform: "translate(-50%, -50%)",
      overflow: 0
    }
  };

  function submitClick() {
    console.log("In click function");
    var firstName = document.getElementById("firstName");
    var firstNameText = firstName.value;
    console.log(firstNameText);
    var lastName = document.getElementById("lastName");
    var lastNameText = lastName.value;
    console.log(lastNameText);
    var email = document.getElementById("email");
    var emailText = email.value;
    console.log(emailText);
    fetch("http://localhost:8000/employees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstNameText,
        lastName: lastNameText,
        email: emailText
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
    function cancelClick() {
      console.log("doesNothingForNow");
    }
  }

  return (
    <div>
      <button className="AddButton" onClick={openModal}>
        + Add Employee
      </button>
      <Modal
        // className="box"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="AllText">
          <h1 className="AddEmpText" ref={_subtitle => (subtitle = _subtitle)}>
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
          <h3 className="TrainedFor">Trained For</h3>
          <div className="RadioButtons">
            <h3 className="MoffittText">Moffitt</h3>
            <div className="MoffittButton">
              <input
                type="checkbox"
                id="moffitt"
                name="moffitt"
                value="moffitt"
              />
            </div>
            <h3 className="DoeText">Doe</h3>
            <div className="DoeButton">
              <input type="checkbox" id="doe" name="doe" value="doe" />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="CancelButton" /*onClick={cancelClick}*/>
            <div className="CancelHover">
              <div className="CancelText">
                <h4>Cancel</h4>
              </div>
            </div>
          </button>
          <button className="SubmitButton" onClick={submitClick}>
            <div className="SubmitText">
              <h4>Submit</h4>
            </div>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function Employees() {
  return (
    <div>
      <div className="AddEmployee">
        <AddEmployee />
      </div>
      <div className="topWordss">
        <h1 className="header">Employees</h1>
      </div>
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
    </div>
  );
}
