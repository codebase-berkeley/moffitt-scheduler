import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import leftArrow from "./Arrows/leftarrow.svg";
import rightArrow from "./Arrows/rightarrow.svg";

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
  for (var i = 0; i < 336; i += 1) {
    a.push(new Shift("#f8f8f8", null, null, null, null));
  }
  let count = 0;
  for (var i = 0; i < 48; i += 1) {
    for (var j = 0; j < 7; j += 1) {
      a[count].start = i;
      a[count].end = i + 1;
      a[count].day = j;
      count += 1;
    }
  }
  return a;
}

function dateObject(day, hour) {
  var dateObject = new Date();
  dateObject.setHours(hour, 0, 0, 0);
  var dayOfWeek = dateObject.getDay();
  var diff = dayOfWeek - day;
  var newDate = dateObject.getDate() - diff;
  dateObject.setDate(newDate);
  return dateObject;
}

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: initialShifts(),
      modalIsOpen: false,
      redirect: null,
      currentWeek: dateObject(0, 0)
    };
    this.stateFixer = this.stateFixer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  previousWeek() {
    let currStartDate = new Date(this.state.currentWeek);
    currStartDate.setDate(currStartDate.getDate() - 7);
    this.setState({ currentWeek: currStartDate }, this.fetchData);
  }

  nextWeek() {
    let currStartDate = new Date(this.state.currentWeek);
    currStartDate.setDate(currStartDate.getDate() + 7);
    this.setState({ currentWeek: currStartDate }, this.fetchData);
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: this.state.shifts,
        userId: this.props.userId,
        currWeek: this.state.currentWeek
      })
    })
      .then(response => {
        console.log("response");
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.shifts === null) {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coverage: true,
        shiftID: currentClickedID,
        sentNotes: notes
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let newShifts = this.state.shifts;
        for (let i = 0; i < newShifts.length; i++) {
          if (newShifts[i].id === currentClickedID) {
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
      "12:00am",
      "12:30am",
      "1:00am",
      "1:30am",
      "2:00am",
      "2:30am",
      "3:00am",
      "3:30am",
      "4:00am",
      "4:30am",
      "5:00am",
      "5:30am",
      "6:00am",
      "6:30am",
      "7:00am",
      "7:30am",
      "8:00am",
      "8:30am",
      "9:00am",
      "9:30am",
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "12:00pm",
      "12:30pm",
      "1:00pm",
      "1:30pm",
      "2:00pm",
      "2:30pm",
      "3:00pm",
      "3:30pm",
      "4:00pm",
      "4:30pm",
      "5:00pm",
      "5:30pm",
      "6:00pm",
      "6:30pm",
      "7:00pm",
      "7:30pm",
      "8:00pm",
      "8:30pm",
      "9:00pm",
      "9:30pm",
      "10:00pm",
      "10:30pm",
      "11:00pm",
      "11:30pm",
    ];

    /*Every 8th element should be an "item-hours" header,
      while every 1-7th element should be a shift cell.
    */
    for (var i = 0, ti = 0; i < 384; i += 1) {
      if (i % 8 === 0) {
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
          {format(addDays(startOfWeek(this.state.currentWeek), i), "dd MM/DD")}
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
        overflow: 0
      }
    };

    function displayMonth(m) {
      const month = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };
      return month[m];
    }

    let startMonth = this.state.currentWeek.getMonth() + 1;
    let startDate = this.state.currentWeek.getDate();
    let year = this.state.currentWeek.getFullYear();

    let endDate = new Date(this.state.currentWeek);
    endDate.setDate(endDate.getDate() + 7);

    let endDateNum = endDate.getDate() - 1;
    let endDateMonth = endDate.getMonth() + 1;

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
          <div className="arrowsAndTitle">
            <div>
              <button className="arrowLeftButton">
                <img
                  className="arrowLeft"
                  onClick={this.previousWeek}
                  src={leftArrow}
                  alt="arrowLeft"
                />
              </button>
            </div>
            <div id="frontWords">
              <h1 id="weekString">
                {displayMonth(startMonth)} {year}: {startMonth}/{startDate} -{" "}
                {endDateMonth}/{endDateNum}
              </h1>
            </div>
            <div>
              <button className="arrowRightButton">
                <img
                  className="arrowRight"
                  onClick={this.nextWeek}
                  src={rightArrow}
                  alt="arrowRight"
                />
              </button>
            </div>
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
