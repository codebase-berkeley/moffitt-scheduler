import React from "react";
import "./Moffitt.css";
import pencil from "./MasterImages/pencil.svg";
import Modal from "react-modal";
import deleteButton from "./MasterImages/delete.svg";
import addButton from "./MasterImages/add.svg";

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
      allEmployees: [{}],
      allDaysOfWeek: [
        sundayArray,
        mondayArray,
        tuesdayArray,
        wednesdayArray,
        thursdayArray,
        fridayArray,
        saturdayArray,
      ],
    };

    for (let day = 0; day < this.state.allDaysOfWeek.length; day++) {
      for (let hour = 0; hour < 24; hour++) {
        this.state.allDaysOfWeek[day][hour] = (
          <Box
            startTime={hour}
            curTime={hour}
            startDay={day}
            shiftId={[]}
            sleId={[]}
            names={[]}
          />
        );
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
          let shiftID = this.state.items[i]["shift_id"];
          let sleID = this.state.items[i]["sle_id"];
          let name = this.state.items[i]["name"];

          console.log("shift id: ", shiftID);
          console.log("sle id: ", sleID);

          if (location == "Moffitt") {
            let start_time = new Date(this.state.items[i]["start_time"]);
            let end_time = new Date(this.state.items[i]["end_time"]);

            let start_time_date = start_time.getDay();
            let end_time_date = start_time.getDay();

            let start_hour = start_time.getHours();
            let end_hour = end_time.getHours();

            let end;

            //If shifts runs across the same day
            if (start_time_date == end_time_date) {
              end = end_hour;
            } else {
              end = 24;
            }

            for (let j = start_hour; j < end; j++) {
              let previousState = this.state.allDaysOfWeek[start_time_date][j]
                .props;
              console.log("pS: ", previousState);

              let shiftArray = previousState.shiftId;
              shiftArray.push(shiftID);
              let sleArray = previousState.sleId;
              sleArray.push(sleID);
              let nameArray = previousState.names;
              nameArray.push(name);

              newAllDaysOfWeek[start_time_date][j] = (
                <Box
                  startTime={start_hour}
                  curTime={j}
                  startDay={start_time_date}
                  shiftId={shiftArray}
                  sleId={sleArray}
                  names={nameArray}
                />
              );
            }
          }
        }
        this.setState({ allDaysOfWeek: newAllDaysOfWeek });
      });
    fetch("/otheremployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("in fetch request");
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("in jsonResponse part");
        console.log("otherEmployees", jsonResponse.allEmployees);
        this.setState({
          allEmployees: jsonResponse.allEmployees,
        });
        console.log("allEmployees", this.state.allEmployees);
        console.log(jsonResponse);
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

function OtherEmployee() {
  var employees = [];
  console.log("itemsssss", this.state.items);
  console.log("in function");
  if (this.state.allEmployees == null) {
    return null;
  }
  console.log("allEmployees2", this.state.allEmployees);
  for (let i = 0; i < this.state.allEmployees.length; i++) {
    employees.push(
      <div className="container">
        <div className="otherEmployee">
          {this.state.allEmployees[i]["name"]}
        </div>
        <div className="icon">
          <button className="addButton">
            <img className="addButtonImg" src={addButton} alt="addButton" />
          </button>
        </div>
      </div>
    );
  }
  return employees;
}

function formatNames(names) {
  if (names.length == 0) {
    return "";
  }
  let result = "";
  for (let i = 0; i < names.length - 1; i++) {
    result += names[i];
    result += "\n";
  }
  result += names[names.length - 1];
  return result;
}

function Box(props) {
  return (
    <div>
      <div className="box">
        <div className="text">{formatNames(props.names)}</div>
        <EditSchedule
          day={props.startDay}
          time={props.curTime}
          employee={props.names}
          sleId={props.sleId}
          shiftId={props.shiftId}
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
    var employees = [];
    for (let i = 0; i < props.employee.length; i++) {
      employees.push(
        <div className="container">
          <div className="currentEmployee">{props.employee[i]}</div>
          <div className="icon">
            <button className="deleteButton">
              <img
                className="deleteButtonImg"
                src={deleteButton}
                alt="deleteButton"
              />
            </button>
          </div>
        </div>
      );
    }
    return employees;
  }

  // function OtherEmployee() {
  //   var employees = [];
  //   console.log("in function");
  //   fetch("/otheremployees", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({}),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((jsonResponse) => {
  //       console.log("otherEmployees", jsonResponse.otherEmployees);
  //       this.setState({
  //         allEmployees: jsonResponse.otherEmployees,
  //       });
  //       console.log("allEmployees", this.state.allEmployees);
  //       console.log(jsonResponse);
  //     });
  //   console.log("allEmployees2", this.state.allEmployees);
  //   if (this.state.allEmployees == null) {
  //     return null;
  //   }
  //   for (let i = 0; i < this.state.allEmployees.length; i++) {
  //     employees.push(
  //       <div className="container">
  //         <div className="otherEmployee">
  //           {this.state.allEmployees[i]["name"]}
  //         </div>
  //         <div className="icon">
  //           <button className="addButton">
  //             <img className="addButtonImg" src={addButton} alt="addButton" />
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return employees;
  // }

  function displayDay(props) {
    const dayOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
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
      23: "11 PM",
    };
    return timeOfDay[props];
  }

  // function removeEmployee(sle_id) {
  //   fetch("/removeemployee", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ employeeID: sle_id })
  //   })
  //     .then(response => {
  //       this.props.fixState(sle_id);
  //       return response.json();
  //     })
  //     .then(jsonResponse => {
  //       console.log(jsonResponse);
  //     });
  // }

  return (
    <div className="modal">
      <button className="pencilIcon" onClick={openModal}>
        <img className="pencilImage" src={pencil} alt="pencil" />
      </button>
      <div className="modal">
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
              <CurrEmployee
                employee={props.employee}
                sleId={props.sl}
                shiftId
              />
            </div>
            <div className="otherEmployees">
              <OtherEmployee
                employee={props.employee}
                sleId={props.sl}
                shiftId
              />
            </div>
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
    </div>
  );
}
