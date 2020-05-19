import React from "react";
import "./Library.css";
import pencil from "./MasterImages/pencil.svg";
import Modal from "react-modal";
import deleteButton from "./MasterImages/delete.svg";
import addButton from "./MasterImages/add.svg";
import { Redirect } from "react-router-dom";
import error from "./MasterImages/error.svg";

function dateObject(week, day, hour) {
  let newSameDate = new Date(week);
  newSameDate.setHours(hour, 0, 0, 0);
  let newSetDate = newSameDate.setDate(newSameDate.getDate() + day);
  return newSetDate;
}

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    let [
      sundayArray,
      mondayArray,
      tuesdayArray,
      wednesdayArray,
      thursdayArray,
      fridayArray,
      saturdayArray
    ] = [[], [], [], [], [], [], []];

    this.state = {
      allEmployees: [{}],
      allDaysOfWeek: [
        sundayArray,
        mondayArray,
        tuesdayArray,
        wednesdayArray,
        thursdayArray,
        fridayArray,
        saturdayArray
      ],
      redirect: null
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currWeek != prevProps.currWeek) {
      this.fetchData();
    }
    if (this.props.location != prevProps.location) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var employeeList = [];
    fetch("/otheremployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        employeeList = jsonResponse.allEmployees;
        this.setState({
          allEmployees: jsonResponse.allEmployees
        });
        fetch("/masterschedule/" + this.props.currWeek, {
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
            if (jsonResponse.items == null) {
              this.setState({ redirect: <Redirect push to="/login" /> });
            }
            if (jsonResponse.items == null) {
              return;
            }
            let items = jsonResponse.items;

            let newAllDaysOfWeek = [[], [], [], [], [], [], []];

            let weekDate = this.props.currWeek;

            for (let day = 0; day < newAllDaysOfWeek.length; day++) {
              for (let hour = 0; hour < 24; hour++) {
                newAllDaysOfWeek[day][hour] = (
                  <Box
                    startTime={hour}
                    curTime={hour}
                    startDay={day}
                    date={dateObject(weekDate, day, hour)}
                    shiftId={[]}
                    sleId={[]}
                    names={[]}
                    allEmp={employeeList}
                    addEmployee={this.addEmployee}
                    removeEmployee={this.removeEmployee}
                    location={this.props.location}
                  />
                );
              }
            }

            for (let i = 0; i < items.length; i++) {
              let location = items[i]["location"];
              let shiftID = items[i]["shift_id"];
              let sleID = items[i]["sle_id"];
              let name = items[i]["name"];

              if (location === this.props.location) {
                let start_time = new Date(items[i]["start_time"]);
                let end_time = new Date(items[i]["end_time"]);

                let start_time_date = start_time.getDay();
                let end_time_date = start_time.getDay();

                let start_hour = start_time.getHours();
                let end_hour = end_time.getHours();

                let end;

                //If shifts runs across the same day
                if (start_time_date === end_time_date) {
                  end = end_hour;
                } else {
                  end = 24;
                }

                for (let j = start_hour; j < end; j++) {
                  let previousState =
                    newAllDaysOfWeek[start_time_date][j].props;

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
                      allEmp={this.state.allEmployees}
                      date={dateObject(weekDate, start_time_date, j)}
                      addEmployee={this.addEmployee}
                      removeEmployee={this.removeEmployee}
                      location={this.props.location}
                    />
                  );
                }
              }
            }
            this.setState({ allDaysOfWeek: newAllDaysOfWeek });
          });
        console.log(jsonResponse);
      });
  }

  removeEmployee(
    sle_id,
    shift_id,
    currTime,
    setIsOpen,
    day,
    employeeArr,
    shiftIdArr,
    sleIdArr,
    removeEmployee,
    allEmp,
    date,
    addEmployee
  ) {
    fetch("/removeemployee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sleId: sle_id,
        shiftId: shift_id,
        currHour: currTime
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        setIsOpen(false);
        console.log(jsonResponse);

        let clonedAllDaysOfWeek = this.state.allDaysOfWeek.slice(0);

        let newSleIdArr = sleIdArr.slice(0);
        let newEmployeeArr = employeeArr.slice(0);
        let newShiftArr = shiftIdArr.slice(0);

        for (let i = 0; i < newSleIdArr.length; i++) {
          //
          if (sle_id === newSleIdArr[i]) {
            newSleIdArr.splice(i, 1);
            newEmployeeArr.splice(i, 1);
            newShiftArr.splice(i, 1);
          }
        }

        clonedAllDaysOfWeek[day][currTime] = (
          <Box
            startTime={currTime}
            curTime={currTime}
            startDay={day}
            shiftId={newShiftArr}
            sleId={newSleIdArr}
            names={newEmployeeArr}
            allEmp={allEmp}
            date={date}
            addEmployee={addEmployee}
            removeEmployee={removeEmployee}
            location={this.props.location}
          />
        );
        this.setState({ allDaysOfWeek: clonedAllDaysOfWeek });
      });
  }

  addEmployee(
    currName,
    sle_id,
    currTime,
    date,
    setIsOpen,
    day,
    allEmp,
    currSleId,
    addEmployee,
    shiftId,
    removeEmployee,
    employee
  ) {
    fetch("/addemployee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sleId: sle_id,
        currHour: currTime,
        currDate: date,
        loc: this.props.location
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        setIsOpen(false);

        let clonedAllDaysOfWeek = this.state.allDaysOfWeek.slice(0);

        let newSleIdArr = currSleId.slice(0);
        newSleIdArr.push(sle_id);

        let newEmployeeArr = employee.slice(0);
        newEmployeeArr.push(currName);

        let newShiftArr = shiftId.slice(0);
        newShiftArr.push(jsonResponse.id);

        clonedAllDaysOfWeek[day][currTime] = (
          <Box
            startTime={currTime}
            curTime={currTime}
            startDay={day}
            shiftId={newShiftArr}
            sleId={newSleIdArr}
            names={newEmployeeArr}
            allEmp={allEmp}
            date={date}
            addEmployee={addEmployee}
            removeEmployee={removeEmployee}
            location={this.props.location}
          />
        );
        this.setState({ allDaysOfWeek: clonedAllDaysOfWeek });
      });
  }

  render() {
    return (
      <div className="weekdayColumns">
        {this.state.redirect}
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

function OtherEmployee(props) {
  var employees = [];
  if (props == null) {
    return null;
  }
  var filteredEmployees = [];
  for (let i = 0; i < props.allEmp.length; i++) {
    if (!props.currSleId.includes(props.allEmp[i]["id"])) {
      filteredEmployees.push(props.allEmp[i]);
    }
  }
  for (let i = 0; i < filteredEmployees.length; i++) {
    employees.push(
      <div className="container">
        <div className="otherEmployee">{filteredEmployees[i]["name"]}</div>
        <div className="icon">
          <button
            className="addButton"
            onClick={() =>
              props.addEmployee(
                filteredEmployees[i]["name"],
                filteredEmployees[i]["id"],
                props.currTime,
                props.date,
                props.setIsOpen,
                props.day,
                props.allEmp,
                props.currSleId,
                props.addEmployee,
                props.shiftId,
                props.removeEmployee,
                props.employee
              )
            }
          >
            <img className="addButtonImg" src={addButton} alt="addButton" />
          </button>
        </div>
      </div>
    );
  }
  return employees;
}

function formatNames(names) {
  if (names.length === 0) {
    return "";
  }
  let result = [];
  for (let i = 0; i < names.length; i++) {
    result.push(<div className="name-row">{names[i]}</div>);
  }
  return result;
}

function Box(props) {
  if (isError(props.location, props.names) == 0) {
    return (
      <div>
        <div className="boxWithoutError">
          <div className="boxText">{formatNames(props.names)}</div>
          <EditSchedule
            day={props.startDay}
            time={props.curTime}
            employee={props.names}
            sleId={props.sleId}
            shiftId={props.shiftId}
            allEmp={props.allEmp}
            currTime={props.curTime}
            date={props.date}
            addEmployee={props.addEmployee}
            removeEmployee={props.removeEmployee}
            location={props.location}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="boxWithError">
          <div className="boxText">{formatNames(props.names)}</div>
          <EditSchedule
            day={props.startDay}
            time={props.curTime}
            employee={props.names}
            sleId={props.sleId}
            shiftId={props.shiftId}
            allEmp={props.allEmp}
            currTime={props.curTime}
            date={props.date}
            addEmployee={props.addEmployee}
            removeEmployee={props.removeEmployee}
            location={props.location}
          />
        </div>
      </div>
    );
  }
}

function displayError(typeOfError) {
  if (typeOfError == 1) {
    return (
      <div className="errorText">
        <img className="errorImg" src={error} alt="error" />
        Warning: Too many employees
      </div>
    );
  }
  if (typeOfError == -1) {
    return (
      <div className="errorText">
        <img className="errorImg" src={error} alt="error" />
        Warning: Not enough employees
      </div>
    );
  }
}

function isError(location, nameArray) {
  if (location === "Moffitt3") {
    if (nameArray.length < 1) {
      return -1;
    } else if (nameArray.length > 2) {
      return 1;
    } else {
      return 0;
    }
  } else if (location === "Moffitt4") {
    if (nameArray.length < 2) {
      return -1;
    } else if (nameArray.length > 3) {
      return 1;
    } else {
      return 0;
    }
  } else {
    //Doe
    if (nameArray.length < 3) {
      return -1;
    } else if (nameArray.length > 5) {
      return 1;
    } else {
      return 0;
    }
  }
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
      top: "330px",
      left: "50%",
      width: "450px",
      height: "460px",
      transform: "translate(-50%, -50%)",
      overflowY: "scroll",
      border: "0px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "20px"
    }
  };

  function CurrEmployee(props) {
    if (props == null) {
      return null;
    }
    var employees = [];
    for (let i = 0; i < props.employee.length; i++) {
      employees.push(
        <div className="container">
          <div className="currentEmployee">{props.employee[i]}</div>
          <div className="icon">
            <button
              className="deleteButton"
              onClick={() =>
                props.removeEmployee(
                  props.sleId[i],
                  props.shiftId[i],
                  props.currTime,
                  setIsOpen,
                  props.day,
                  props.employee,
                  props.shiftId,
                  props.sleId,
                  props.removeEmployee,
                  props.allEmp,
                  props.date,
                  props.addEmployee
                )
              }
            >
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
    };
    return timeOfDay[props];
  }

  function displayLoc(loc) {
    if (loc === "Moffitt3") {
      return "Moffitt 3rd";
    } else if (loc === "Moffitt4") {
      return "Moffitt 4th";
    } else {
      return "Doe";
    }
  }

  return (
    <div>
      <button className="pencilIcon" onClick={openModal}>
        <img className="pencilImage" src={pencil} alt="pencil" />
      </button>
      <div className="modal-wrapper">
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
              ref={_subtitle => (subtitle = _subtitle)}
            >
              Edit Master Schedule Shift
            </h1>
            <div className="shiftInfo">
              <div className="locationTag">
                <h3 className="locTag">{displayLoc(props.location)}</h3>
              </div>
              <div className="timeTag">
                <h3 className="tTag">
                  {displayDay(props.day)}, {displayTime(props.time)}
                </h3>
              </div>
            </div>
            <div className="error">
              {displayError(isError(props.location, props.employee))}
            </div>
            <h3 className="CurrentEmployees">Current Employees</h3>
            <div className="currEmployees">
              <CurrEmployee
                allEmp={props.allEmp}
                sleId={props.sleId}
                currTime={props.currTime}
                date={props.date}
                setIsOpen={setIsOpen}
                addEmployee={props.addEmployee}
                day={props.day}
                shiftId={props.shiftId}
                removeEmployee={props.removeEmployee}
                employee={props.employee}
              />
            </div>
            <h3 className="NotInShift">Employees Not in Shift</h3>
            <div className="otherEmployees">
              <OtherEmployee
                allEmp={props.allEmp}
                currSleId={props.sleId}
                currTime={props.currTime}
                date={props.date}
                setIsOpen={setIsOpen}
                addEmployee={props.addEmployee}
                day={props.day}
                shiftId={props.shiftId}
                removeEmployee={props.removeEmployee}
                employee={props.employee}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
