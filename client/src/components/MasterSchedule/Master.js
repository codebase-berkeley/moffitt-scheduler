import React from "react";
import Modal from "react-modal";

import "../Schedule/Builder.css";
import "./Master.css";
import {
  getBlankSchedule,
  abbrevs,
  revAbbrevs,
  days,
  modalStyles,
  abbrevToIndex,
  getStartOfWeek,
  getDatePlusX,
  shortDate,
  timeToString,
  pAbbrevs
} from "../../utils";

import sheets from "./sheets.png";

import * as Excel from "exceljs/dist/exceljs";

import { saveAs } from "file-saver";

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      library: "moffitt3",
      schedule: getBlankSchedule([]),
      modalDay: null,
      modalTime: null,
      modalAssigned: [],
      modalIsOpen: false,
      employees: {},
      week: getStartOfWeek()
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
    this.setSchedule = this.setSchedule.bind(this);

    this.applyClick = this.applyClick.bind(this);
    this.spreadsheetClick = this.spreadsheetClick.bind(this);
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
        this.setSchedule();
      });
  }

  setSchedule() {
    fetch("/api/getmaster", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ week: this.state.week })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ schedule: json.schedule });
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

    var date = new Date(this.state.week);
    date.setDate(date.getDate() + abbrevToIndex[this.state.modalDay]);

    fetch("/api/updatemaster", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        library: this.state.library,
        time: this.state.modalTime,
        date: date,
        assigned: this.state.modalAssigned
      })
    });

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
    this.setState({ week: newWeek }, this.setSchedule);
  }

  scrollRightClick() {
    var newWeek = new Date(this.state.week);
    newWeek.setDate(newWeek.getDate() + 7);
    this.setState({ week: newWeek }, this.setSchedule);
  }

  applyClick() {
    var schedName = document.getElementById("apply-box").value;
    fetch("/api/applysched/" + schedName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ week: this.state.week })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ schedule: json.schedule });
      });
  }

  spreadsheetClick() {
    spreadsheetGen(this.state.week, this.state.schedule);
  }

  render() {
    var startDate = this.state.week;
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return (
      <div className="master">
        <div className="header">
          <h1>Master Schedule</h1>
          <img
            className="click-image"
            src={sheets}
            onClick={this.spreadsheetClick}
            width="20"
          />
        </div>
        {this.getModal()}
        <div className="master-options-bar">
          <div className="apply-schedule">
            <p>Apply Schedule:</p> <input type="text" id="apply-box" /> <br />
            <button className="basic-button" onClick={this.applyClick}>
              Apply
            </button>
          </div>
          <div className="date-scroll">
            <button
              className="scroll basic-button"
              onClick={this.scrollLeftClick}
            >
              &lt;
            </button>
            <p className="date">
              {dateToString(startDate)} - {dateToString(endDate)}
            </p>
            <button
              className="scroll basic-button"
              onClick={this.scrollRightClick}
            >
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
        {props.day} {props.date.getMonth() + 1}/{props.date.getDate()}
      </div>
    </td>
  );
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
  return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
}

async function spreadsheetGen(date, schedule) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  addHeader(ws, date);
  addLocationLabels(ws);
  addDayLabels(ws, date);

  const buf = await wb.xlsx.writeBuffer();

  saveAs(new Blob([buf]), "abc.xlsx");
}

function addHeader(ws, firstDay) {
  var lastDay = getDatePlusX(firstDay, 6);

  ws.addRow([shortDate(firstDay) + " - " + shortDate(lastDay)]);
  ws.mergeCells("A1:W1");
}

function addLocationLabels(ws) {
  var row_values = [];
  row_values[0] = "Main Stacks";
  row_values[8] = "Moffitt 3rd";
  row_values[16] = "Moffitt 4th";
  ws.insertRow(2, row_values);
  ws.mergeCells("A2:G2");
  ws.mergeCells("I2:O2");
  ws.mergeCells("Q2:W2");
}

function addDayLabels(ws, firstDay) {
  var row = [];
  // three different locations
  for (let i = 0; i < 3; i++) {
    for (let d = 0; d < 7; d++) {
      row.push(pAbbrevs[d] + " " + shortDate(getDatePlusX(firstDay, d)));
    }
    row.push("");
  }

  ws.addRow(row);
}

export default Builder;
