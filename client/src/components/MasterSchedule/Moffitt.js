import React from "react";
import "./Moffitt.css";
import pencil from "./MasterImages/pencil.svg";
import Modal from "react-modal";
import deleteButton from "./MasterImages/delete.png";

export default class Moffitt extends React.Component {
  constructor(props) {
    super(props);
    let [
      sundayArray,
      mondayArray,
      tuesdayArray,
      wednesdayArray,
      thursdayArray,
      fridayArray,
      saturdayArray,
    ] = [[], [], [], [], [], [], []];
    this.state = {
      items: [{}],
      allDaysOfWeek: [
        sundayArray,
        mondayArray,
        tuesdayArray,
        wednesdayArray,
        thursdayArray,
        fridayArray,
        saturdayArray,
      ],
      employeesInShift: [],
    };
    for (let i = 0; i < this.state.allDaysOfWeek.length; i++) {
      for (let j = 0; j < 24; j++) {
        this.state.allDaysOfWeek[i].push(<Box startDay={i} curTime={j} />);
      }
    }
  }
  componentDidMount() {
    fetch("/masterschedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({
          items: jsonResponse.items,
        });
        let newAllDaysOfWeek = this.state.allDaysOfWeek;
        for (let i = 0; i < this.state.items.length; i++) {
          console.log("items: ", this.state.items);
          let location = this.state.items[i]["location"];
          if (location == "Moffitt") {
            let name = this.state.items[i]["name"];
            let start_time = new Date(this.state.items[i]["start_time"]);
            let end_time = new Date(this.state.items[i]["end_time"]);
            let start_time_date = start_time.getDay();
            let end_time_date = start_time.getDay();
            let start_hour = start_time.getHours();
            let end_hour = end_time.getHours();
            if (start_time_date == end_time_date) {
              //If shifts runs across the same day
              for (let i = start_hour; i < end_hour; i++) {
                let previousState = this.state.allDaysOfWeek[start_time_date][i]
                  .props.text;
                if (previousState == null) {
                  newAllDaysOfWeek[start_time_date][i] = (
                    <Box
                      text={name}
                      startTime={start_hour}
                      curTime={i}
                      startDay={start_time_date}
                    />
                  );
                } else {
                  newAllDaysOfWeek[start_time_date][i] = (
                    <Box
                      text={previousState + "," + "\n" + name}
                      startTime={start_hour}
                      curTime={i}
                      startDay={start_time_date}
                    />
                  );
                }
              }
              console.log("start hour: ", start_hour);
            } else {
              //In case days are not the same (i.e. Sunday-Monday shift)
              for (let i = start_hour; i < 24; i++) {
                let previousState = this.state.allDaysOfWeek[start_time_date][i]
                  .props.text;
                if (previousState == null) {
                  newAllDaysOfWeek[start_time_date][i] = (
                    <Box
                      text={name}
                      startTime={start_hour}
                      curTime={i}
                      startDay={start_time_date}
                    />
                  );
                } else {
                  newAllDaysOfWeek[start_time_date][i] = (
                    <Box
                      text={previousState + "," + "\n" + name}
                      startTime={start_hour}
                      curTime={i}
                      startDay={start_time_date}
                    />
                  );
                }
              }
              // for (let i = 0; i < end_hour; i++) {
              //   let previousState = this.state.allDaysOfWeek[end_time_date][i]
              //     .props.text;
              //   if (previousState == null) {
              //     newAllDaysOfWeek[end_time_date][i] = (
              //       <Box
              //         text={name}
              //         startTime={start_hour}
              //         startDay={end_time_date}
              //       />
              //     );
              //   } else {
              //     newAllDaysOfWeek[end_time_date][i] = (
              //       <Box
              //         text={previousState + "," + "\n" + name}
              //         startTime={start_hour}
              //         startDay={end_time_date}
              //       />
              //     );
              //   }
              // }
            }
          }
        }
        this.setState({ allDaysOfWeek: newAllDaysOfWeek });
      });
  }

  render() {
    return (
      <div className="weekdayColumns">
        <div className="sundayColumn">{this.state.allDaysOfWeek[0]}</div>
        <div className="mondayColumn">{this.state.allDaysOfWeek[1]}</div>
        <div className="tuesdayColumn">{this.state.allDaysOfWeek[2]}</div>
        <div className="wednesdayColumn">{this.state.allDaysOfWeek[3]}</div>
        <div className="thursdayColumn">{this.state.allDaysOfWeek[4]}</div>
        <div className="fridayColumn">{this.state.allDaysOfWeek[5]}</div>
        <div className="saturdayColumn">{this.state.allDaysOfWeek[6]}</div>
      </div>
    );
  }
}

function Box(props) {
  return (
    <div>
      <div className="box">
        {props.text}
        <EditSchedule
          day={props.startDay}
          time={props.curTime}
          employee={props.text}
        // sleId={props.}
        // shiftId={props.}
        />
      </div>
    </div>
  );
}

function EditSchedule(props) {
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

  function CurrEmployee(props) {
    if (props.employee == null) {
      return null;
    }
    var list = props.employee.split(",");
    var employees = [];
    for (let i = 0; i < list.length; i++) {
      employees.push(
        <div>
          <div className="currentEmployee">{list[i]}</div>
          <button className="deleteButton" onClick={removeEmployee(props)}>
            <img
              className="deleteButtonImg"
              src={deleteButton}
              alt="deleteButton"
            />
          </button>
        </div>
      );
    }
    return employees;
  }

  function displayDay(props) {
    const dayOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday"
    };
    return dayOfWeek[props];
  }

  function displayTime(props) {
    const timeOfDay = {
      0: "12 AM",
      1: "1 AM",
      2: "2 AM",
      3: "3 AM",
      4: "4 AM",
      5: "5 AM",
      6: "6 AM",
      7: "7 AM",
      8: "8 AM",
      9: "9 AM",
      10: "10 AM",
      11: "11 AM",
      12: "12 PM",
      13: "1 PM",
      14: "2 PM",
      15: "3 PM",
      16: "4 PM",
      17: "5 PM",
      18: "6 PM",
      19: "7 PM",
      20: "8 PM",
      21: "9 PM",
      22: "10 PM",
      23: "11 PM"
    }
    return timeOfDay[props];
  }

  function otherEmployee() { }

  function removeEmployee(sle_id) {
    fetch("/removeemployee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeID: sle_id })
    })
      .then(response => {
        this.props.fixState(sle_id);
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
  }

  return (
    <div>
      <button className="pencilIcon" onClick={openModal}>
        <img className="pencilImage" src={pencil} alt="pencil" />
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
              <h3 className="locTag">Moffitt 3rd Floor</h3>
            </div>
            <div className="timeTag">
              <h3 className="tTag">
                {displayDay(props.day)}, {displayTime(props.time)}
              </h3>
            </div>
          </div>
          <div className="currEmployees">
            <CurrEmployee employee={props.employee} sleId={props.sl} shiftId />
          </div>
          <div className="otherEmployees"></div>
        </div>
        <div className="button-container">
          <a href="/masterschedule">
            <button className="CancelButton">
              <div className="CancelHover">
                <div className="CancelText">
                  <h4> Cancel</h4>
                </div>
              </div>
            </button>
          </a>
          <button className="SubmitButton" onClick={submitClick}>
            <div className="saveText">
              <h4>Save Changes</h4>
            </div>
          </button>
        </div>
      </Modal>
    </div>
  );
}
