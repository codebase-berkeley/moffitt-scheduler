import React from "react";
import Modal from "react-modal";

import "../Schedule/Builder.css";
import "./Master.css";

var abbrevs = {
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
  Saturday: "sat",
  Sunday: "sun"
};

var revAbbrevs = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday"
};

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var libraries = ["moffitt3", "moffitt4", "main"];

var modalStyles = {
  content: {
    position: "absolute",
    top: "150px",
    left: "40%",
    width: "400px",
    height: "200px",
    transform: "translate(-50%, -50%)",
    paddingLeft: "5px",
    backgroundColor: "white",
    overflow: 0
  }
};

class Builder extends React.Component {
  constructor(props) {
    super(props);
    var schedule = {
      moffitt3: {
        sun: {},
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {}
      },
      moffitt4: {
        sun: {},
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {}
      },
      main: {
        sun: {},
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {}
      }
    };
    for (var l = 0; l < libraries.length; l++) {
      var library = libraries[l];
      for (var d = 0; d < days.length; d++) {
        var abbrev = abbrevs[days[d]];
        for (var t = 0; t < 24; t += 0.5) {
          schedule[library][abbrev][t] = [];
        }
      }
    }

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    this.state = {
      library: "moffitt3",
      schedule: schedule,
      modalDay: null,
      modalTime: null,
      modalAssigned: [],
      modalIsOpen: false,
      employees: {},
      week: startOfWeek
    };

    this.getModal = this.getModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.slotClick = this.slotClick.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
    this.addEmployeeClick = this.addEmployeeClick.bind(this);
    this.saveModalClick = this.saveModalClick.bind(this);

    this.moffitt3Click = this.moffitt3Click.bind(this);
    this.moffitt4Click = this.moffitt4Click.bind(this);
    this.mainClick = this.mainClick.bind(this);

    this.scrollLeftClick = this.scrollLeftClick.bind(this);
    this.scrollRightClick = this.scrollRightClick.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement("body");
    fetch("/api/employees", { credentials: "include" })
      .then(response => response.json())
      .then(json => {
        var employees = {};
        for (var i = 0; i < json.employees.length; i++) {
          employees[json.employees[i].name] = json.employees[i].id;
        }
        this.setState({ employees: employees });
      });
  }

  /* Library change clicks */
  moffitt3Click() {
    this.setState({ library: "moffitt3" });
  }

  moffitt4Click() {
    this.setState({ library: "moffitt4" });
  }

  mainClick() {
    this.setState({ library: "main" });
  }

  slotClick(day, time) {
    this.setState({
      modalDay: day,
      modalTime: time,
      modalAssigned: this.state.schedule[this.state.library][day][time],
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  modalDelete(idx) {
    var assigned = [...this.state.modalAssigned];

    assigned.splice(idx, 1);

    this.setState({ modalAssigned: assigned });
  }

  addEmployeeClick() {
    var newEmp = document.getElementById("add-employee-box").value;

    newEmp = newEmp.split('"').join("");
    var assigned = [...this.state.modalAssigned];
    assigned.push({ name: newEmp, id: this.state.employees[newEmp] });

    this.setState({ modalAssigned: assigned });
  }

  saveModalClick() {
    var sched = JSON.parse(JSON.stringify(this.state.schedule));

    sched[this.state.library][this.state.modalDay][
      this.state.modalTime
    ] = this.state.modalAssigned;

    this.setState({ schedule: sched, modalIsOpen: false });
  }

  inModalAssigned(name) {
    for (var i = 0; i < this.state.modalAssigned.length; i++) {
      if (this.state.modalAssigned[i].name === name) {
        return true;
      }
    }

    return false;
  }

  getModal() {
    var assigned = [];
    for (let i = 0; i < this.state.modalAssigned.length; i++) {
      assigned.push(
        <AssignedEmp
          key={i}
          name={this.state.modalAssigned[i].name}
          md={this.modalDelete}
          idx={i}
        />
      );
    }

    var additions = [];
    var employeeNames = Object.keys(this.state.employees);
    for (let i = 0; i < employeeNames.length; i++) {
      if (!this.inModalAssigned(employeeNames[i])) {
        var value = '"' + employeeNames[i] + '"';
        additions.push(
          <option key={i} value={value}>
            {employeeNames[i]}
          </option>
        );
      }
    }
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={modalStyles}
        className="edit-modal"
      >
        <button className="close-modal" onClick={this.closeModal}>
          X
        </button>
        <h2>
          {revAbbrevs[this.state.modalDay]} from
          {" " + timeToString(this.state.modalTime)} to
          {" " + timeToString(this.state.modalTime + 0.5)}
        </h2>
        <h3>Assigned Employees:</h3>
        <table>
          <tbody>{assigned}</tbody>
        </table>
        <select id="add-employee-box">{additions}</select>
        <button
          className="add-employee builder-button"
          onClick={this.addEmployeeClick}
        >
          Add Employee
        </button>
        <br />
        <button
          className="save-changes builder-button"
          onClick={this.saveModalClick}
        >
          Save
        </button>
      </Modal>
    );
  }

  scrollLeftClick() {
    var newWeek = new Date(this.state.week);
    newWeek.setDate(newWeek.getDate() - 7);
    this.setState({ week: newWeek });
  }

  scrollRightClick() {
    var newWeek = new Date(this.state.week);
    newWeek.setDate(newWeek.getDate() + 7);
    this.setState({ week: newWeek });
  }

  render() {
    var startDate = this.state.week;
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return (
      <div>
        {this.getModal()}
        <div className="options-bar">
          <div className="date-scroll">
            <button className="scroll" onClick={this.scrollLeftClick}>
              &lt;
            </button>
            {dateToString(startDate)}-{dateToString(endDate)}
            <button className="scroll" onClick={this.scrollRightClick}>
              &gt;
            </button>
          </div>
          <Libraries
            selected={this.state.library}
            m3c={this.moffitt3Click}
            m4c={this.moffitt4Click}
            mac={this.mainClick}
          />
        </div>
        <Calendar
          week={this.state.week}
          schedule={this.state.schedule[this.state.library]}
          sc={this.slotClick}
        />
      </div>
    );
  }
}

function getDatePlusX(date, x) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + x);
  return newDate;
}

function Calendar(props) {
  var dayLabels = [<th key={-1}></th>]; // The first column is for time labels
  for (var i = 0; i < days.length; i++) {
    dayLabels.push(
      <DayLabel key={i} day={days[i]} date={getDatePlusX(props.week, i)} />
    );
  }

  var tableContents = [];
  for (var t = 0; t < 24; t += 0.5) {
    var time = [<TimeLabel key={-1} time={t} />];
    for (var d = 0; d < days.length; d++) {
      var abbrev = abbrevs[days[d]];
      var employees = props.schedule[abbrev][t];
      time.push(
        <Slot
          key={d}
          sc={props.sc}
          open={true}
          day={abbrevs[days[d]]}
          time={t}
          employees={employees}
        />
      );
    }
    tableContents.push(<tr key={t}>{time}</tr>);
  }

  return (
    <table>
      <thead>
        <tr>{dayLabels}</tr>
      </thead>
      <tbody>{tableContents}</tbody>
    </table>
  );
}

// open: whether or not the library is currently open
// day: 3 lowercase letters for day of week (i.e mon)
// time: number (in military) time, representing the time of the day (.5 used for half hour)
// employees: The names and ids of the employees working that slot
// sc: function to be called when a slot is clicked
function Slot(props) {
  var names = [];
  for (var i = 0; i < props.employees.length; i++) {
    var n = props.employees[i].name;
    if (n.length > 14) {
      n = n.substring(0, 13) + "...";
    }
    names.push(<p key={i}>{n}</p>);
  }

  return (
    <td className="slot-cont">
      <div onClick={() => props.sc(props.day, props.time)} className="slot">
        {names}
      </div>
    </td>
  );
}

function AssignedEmp(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <button className="delete-emp" onClick={() => props.md(props.idx)}>
          X
        </button>
      </td>
    </tr>
  );
}

// day: the day of the week (i.e. Sunday)
function DayLabel(props) {
  return (
    <td className="day-cont">
      <div className="day-label">
        {props.day} {props.date.getMonth()}/{props.date.getDate()}
      </div>
    </td>
  );
}

function timeToString(time) {
  var period = "AM";
  if (time >= 12) {
    period = "PM";
  }

  if (time >= 13) {
    time -= 12;
  }

  if (time === 0 || time === 0.5) {
    time += 12;
  }

  var minutes = "30";
  var hour = Math.floor(time);
  if (hour === time) {
    minutes = "00";
  }

  return hour + ":" + minutes + " " + period;
}

// time: the time of the day in military time
function TimeLabel(props) {
  return (
    <td className="time-cont">
      <div className="time-label">{timeToString(props.time)}</div>
    </td>
  );
}

function Libraries(props) {
  return (
    <div className="libraries">
      <button
        className={props.selected === "moffitt3" ? "selected" : null}
        onClick={props.m3c}
      >
        Moffitt 3
      </button>
      <button
        className={props.selected === "moffitt4" ? "selected" : null}
        onClick={props.m4c}
      >
        Moffitt 4
      </button>
      <button
        className={props.selected === "main" ? "selected" : null}
        onClick={props.mac}
      >
        Main Stacks
      </button>
    </div>
  );
}

function dateToString(d) {
  return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
}

export default Builder;
