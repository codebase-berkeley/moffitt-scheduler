import React from "react";
import Modal from "react-modal";
import "./MSRenderer.css";
import Moffitt from "./Moffitt";
import Doe from "./Doe";

export default class MSRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfLibrary: "moffitt",
    };
    this.showMoffit = this.showMoffit.bind(this);
    this.showDoe = this.showDoe.bind(this);
  }

  showMoffit() {
    this.setState({ typeOfLibrary: "moffitt" });
  }

  showDoe() {
    this.setState({ typeOfLibrary: "doe" });
  }

  render() {
    let typeOfLibrary = this.state.typeOfLibrary;
    let pending;
    let clicked;
    let nonClicked;
    if (typeOfLibrary == "moffitt") {
      pending = <Moffitt />;
      clicked = "moffittButton";
      nonClicked = "doeButton";
    } else if (typeOfLibrary == "doe") {
      pending = <Doe />;
      clicked = "doeButton";
      nonClicked = "moffittButton";
    } else {
      pending = null;
    }
    return (
      <div className="everything">
        <div classname="masterScheduleAndButtons">
          <div className="masterScheduleText">Master Schedule</div>
          <div className="buttons">
            <button className={clicked} onClick={this.showMoffit}>
              <h1>Moffitt</h1>
            </button>
            <button className={nonClicked} onClick={this.showDoe}>
              <h1>Doe</h1>
            </button>
          </div>
          <div className="editButtonCont">
            <EditSchedule />
          </div>
        </div>

        <div className="weekdayBox">
          <div className="weekdayText">
            <div className="sunday">Sunday</div>
            <div className="monday">Monday</div>
            <div className="tuesday">Tuesday</div>
            <div className="wednesday">Wednesday</div>
            <div className="thursday">Thursday</div>
            <div className="friday">Friday</div>
            <div className="saturday">Saturday</div>
          </div>
          {/* <Box text="something" /> */}
        </div>
        <div className="boxesAndDates">
          <div className="hours">
            <div className="hour">12 AM</div>
            <div className="hour">1 AM</div>
            <div className="hour">2 AM</div>
            <div className="hour">3 AM</div>
            <div className="hour">4 AM</div>
            <div className="hour">5 AM</div>
            <div className="hour">6 AM</div>
            <div className="hour">7 AM</div>
            <div className="hour">8 AM</div>
            <div className="hour">9 AM</div>
            <div className="hour">10 AM</div>
            <div className="hour">11 AM</div>
            <div className="hour">12 PM</div>
            <div className="hour">1 PM</div>
            <div className="hour">2 PM</div>
            <div className="hour">3 PM</div>
            <div className="hour">4 PM</div>
            <div className="hour">5 PM</div>
            <div className="hour">6 PM</div>
            <div className="hour">7 PM</div>
            <div className="hour">8 PM</div>
            <div className="hour">9 PM</div>
            <div className="hour">10 PM</div>
            <div className="hour">11 PM</div>
          </div>
          {pending}
        </div>
        {/* <Box text="something" /> */}
      </div>
    );
  }
}

function Box(props) {
  return <div>{props.text}</div>;
}

function EditSchedule() {
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
      overflow: 0,
    },
  };

  function submitClick() {
    var firstName = document.getElementById("firstName");
    var firstNameText = firstName.value;
    console.log(firstNameText);
    var lastName = document.getElementById("lastName");
    var lastNameText = lastName.value;
    console.log(lastNameText);
    var email = document.getElementById("email");
    var emailText = email.value;
    console.log(emailText);
    fetch("http://localhost:8000/masterschedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameText,
        lastName: lastNameText,
        email: emailText,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
    function cancelClick() {
      console.log("doesNothingForNow");
    }
  }

  return (
    <div>
      <button className="editButton" onClick={openModal}>
        Edit Schedule
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="AllText">
          <h1
            className="AddEmpText"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Edit Master Schedule Shift
          </h1>
          <div className="shiftInfo">
            <div className="locationTag">
              <h3 className="locTag">Moffitt Floor 4</h3>
            </div>
            <div className="timeTag">
              <h3 className="tTag">Sunday, 12AM</h3>
            </div>
          </div>
          <div className="dd-wrapper">
            <div className="dd-header">
              <div className="dd-header-title">Select Employees</div>
            </div>
            <ul className="dd-list">
              <li className="dd-list-item">Kathleen Kong</li>
              <li className="dd-list-item">Kerry Huang</li>
              <li className="dd-list-item">Sahil Thakur</li>
            </ul>
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
