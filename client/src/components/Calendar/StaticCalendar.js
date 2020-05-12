import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
let currentClicked = null;
let currentClickedID = null;
function Timeslot(props) {
  return (
    <div
      class="item-cell"
      style={{ backgroundColor: props.color }}
      id={props.id}
      onClick={props.onClick}
    ></div>
  );
}

class Shift {
  constructor(color, id, start, end, day) {
    this.color = color;
    this.id = id;
    this.start = start;
    this.end = end;
    this.day = day;
  }
}

function initialShifts() {
  let a = [];
  for (var i = 0; i < 168; i += 1) {
    a.push(new Shift("#f8f8f8", null, null, null, null));
  }
  let count = 0;
  for (var i = 0; i <= 23; i += 1) {
    for (var j = 0; j <= 6; j += 1) {
      a[count].start = i;
      a[count].end = i + 1;
      a[count].day = j;
      count += 1;
    }
  }
  return a;
}

var currentDate = new Date();
var weekString =
  format(currentDate, "MMMM") +
  " " +
  format(currentDate, "YYYY") +
  ": " +
  format(startOfWeek(currentDate), "MM/DD") +
  " - " +
  format(endOfWeek(currentDate), "MM/DD");

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: initialShifts(),
      modalIsOpen: false,
      redirect: null,
    };
    this.stateFixer = this.stateFixer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  componentDidMount() {
    fetch("/staticcalendar/", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.state.shifts,
      }),
    })
      .then((response) => {
        console.log("response");
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.shifts == null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        } else {
          this.setState({ shifts: jsonResponse.shifts });
        }
      });
  }

  stateFixer(e) {
    if (
      e.target.id != "" &&
      e.target.style.backgroundColor != "rgb(193, 135, 211)"
    ) {
      /*The point of the background color check is to make sure that once a shift is requested to be covered,
       * this can't happen again for the same shift.
       */
      currentClicked = e;
      currentClickedID = e.target.id;
      this.openModal();
    }
  }
  submitClick() {
    let reason = document.getElementById("reason");
    let notes = reason.value;
    fetch("/changecoverage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coverage: true,
        shiftID: currentClickedID,
        sentNotes: notes,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        let newShifts = this.state.shifts;
        for (let i = 0; i < newShifts.length; i++) {
          if (newShifts[i].id == currentClickedID) {
            newShifts[i].color = "#C187D3";
          }
        }
        this.setState({ shifts: newShifts });
      });
    this.closeModal();
  }
  cancelClick() {
    this.closeModal();
  }
  render() {
    const timeslots = [];
    const hours = [
      "12am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
    ];

    /*Every 8th element should be an "item-hours" header,
      while every 1-7th element should be a shift cell.
    */
    for (var i = 0, ti = 0; i < 192; i += 1) {
      if (i % 8 == 0) {
        timeslots.push(<div class="item-hours">{hours[i / 8]}</div>);
      } else {
        timeslots.push(
          <Timeslot
            color={this.state.shifts[ti].color}
            id={this.state.shifts[ti].id}
            onClick={this.stateFixer}
          />
        );
        ti += 1;
      }
    }

    const wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div class="item-wday">
          {format(addDays(startOfWeek(currentDate), i), "dd MM/DD")}
        </div>
      );
    }

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

    return (
      <div id="overall-container">
        {this.state.redirect}
        <h1 id="yourshifts">Your Shifts</h1>
        <Modal
          // className="box"
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1 className="requestCoverHeader">Request Cover</h1>
          <div className="reasonForCover">
            <h3 className="Reason">Reason:</h3>
            <input className="reasonInput" id="reason" />
          </div>
          <div className="button-container">
            {/* <a href="/staticcalendar/1"> */}
            <button className="CancelButton" onClick={this.cancelClick}>
              <div className="CancelHover">
                <div className="CancelText">
                  <h4> Cancel</h4>
                </div>
              </div>
            </button>
            {/* </a> */}
            <button className="SubmitButton" onClick={this.submitClick}>
              <div className="SubmitText">
                <h4>Submit</h4>
              </div>
            </button>
          </div>
        </Modal>
        <div id="schedule-container-st">
          <div id="frontWords">
            <h1 id="weekString">{weekString}</h1>
          </div>
          <div id="legend">
            <div id="libtag">
              <h3 id="findingspace">Moffitt 3rd&nbsp;</h3>
              <div id="moffitt3colorStatic"></div>
              <h3 id="findingspace">&nbsp;&nbsp;Moffitt 4th&nbsp;</h3>
              <div id="moffitt4color"></div>
            </div>
            <div id="libtag">
              <h3 id="findingspace">&nbsp;&nbsp;Doe&nbsp;</h3>
              <div id="doecolorStatic"></div>
              <h3 id="findingspace">&nbsp;&nbsp;Cover Requested&nbsp;</h3>
              <div id="coverrequestedcolor"></div>
            </div>
          </div>
          <div id="inner-schedule">
            <div></div>

            {wkdays}

            {timeslots}
          </div>
        </div>
      </div>
    );
  }
}
