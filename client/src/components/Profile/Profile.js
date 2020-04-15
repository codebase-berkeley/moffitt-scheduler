import React from "react";
import "./Profile.css";
import star from "./Images/star.png";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import ScheduleSelector from "react-schedule-selector";
let currentClicked = null;
let currentClickedID = null;

function Timeslot(props) {
  return (
    <div
      className="item-cell"
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

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shifts: initialShifts(), schedule: [] };
    this.currentDate = new Date();
    this.deselectCell = <div class="deselectCell"></div>;
    this.selectCell = <div class="selectCell"></div>;
    this.stateFixer = this.stateFixer.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.renderCustomDateCell = this.renderCustomDateCell.bind(this);
  }

  componentDidMount() {
    fetch("/availability/" + this.props.match.params.userId)
      .then((response) => {
        console.log("availability response");
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("availability response 2");
        this.setState({ schedule: jsonResponse.schedule });
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

  renderCustomDateCell = (time, selected, innerRef) => {
    return (
      <div style={{ textAlign: "center" }} ref={innerRef}>
        {selected ? this.selectCell : this.deselectCell}
      </div>
    );
  };

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
    let timeslots = [];
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
        timeslots.push(<div className="item-hours">{hours[i / 8]}</div>);
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

    let wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div className="item-wday">
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
      <div>
        <div>
          <div className="everything">
            <div className="myProfile">
              <h1 className="myProfileText">My Profile</h1>
            </div>
            <div className="profileBox">
              <div className="myProfileContainer">
                <div className="profilePictureContainer">
                  <div className="profilePicture"></div>
                </div>

                <div className="nameAndEmail">
                  <div className="nameText">Bianca Lee</div>
                  <div className="emailText">biancalee@berkeley.edu</div>
                </div>

                <div className="trainingLevels">
                  <h1 className="trainingLevelsText">Training Levels</h1>
                </div>
                <div className="trainingLevelsContainer">
                  <div className="trainingLevelsMoffittThird">
                    <div className="moffittThirdText">Moffitt 3rd</div>
                    <img src={star} height="20" width="20"></img>
                  </div>
                  <div className="trainingLevelsMoffittFourth">
                    <div className="moffittFourthText">Moffitt 4th</div>
                    <img src={star} height="20" width="20"></img>
                  </div>
                  <div className="trainingLevelsDoe">
                    <div className="doeText">Doe</div>
                    <img src={star} height="20" width="20"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="stats">
              <h1 className="statsText">Stats</h1>
            </div>
            <div className="statsBox">
              <div className="statsNumbers">
                <div className="firstStat">12</div>
                <div className="secondStat">80</div>
                <div className="thirdStat">4</div>
              </div>
              <div className="statsDescriptions">
                <div className="firstStatDesc">scheduled hours per week</div>
                <div className="secondStatDesc">total hours worked</div>
                <div className="thirdStatDesc">
                  shifts requested to be covered
                </div>
              </div>
            </div>
            <div className="scheduledShifts">
              <div className="scheduledShiftsText">Scheduled Shifts</div>
            </div>
          </div>
          <div id="schedule-container-st">
            <div id="frontWords">
              <h1 id="weekString">{weekString}</h1>
            </div>
            <div id="legend">
              <div id="libtag">
                <h3 id="findingspace">Moffitt&nbsp;&nbsp;</h3>
                <div id="moffittcolor"></div>
              </div>
              <div id="libtag">
                <h3 id="findingspace">Doe&nbsp;&nbsp;</h3>
                <div id="doecolor"></div>
              </div>
            </div>
            <div id="inner-schedule">
              <div></div>

              {wkdays}

              {timeslots}
            </div>
          </div>
        </div>
        <div id="overall-container">
          <div className="availabilityHeader">
            <div className="availabilitiesText">Availabilities</div>
          </div>
          <div className="invisible"></div>

          <div className="availabilitiesInvisible" id="schedule-container">
            <h1 id="weekString">{weekString}</h1>
            <ScheduleSelector
              startDate={startOfWeek(this.currentDate)}
              selection={this.state.schedule}
              numDays={7}
              minTime={0}
              maxTime={23}
              dateFormat="dd MM/DD"
              renderDateCell={this.renderCustomDateCell}
            />
          </div>
        </div>
      </div>
    );
  }
}
