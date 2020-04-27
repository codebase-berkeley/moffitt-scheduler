import React from "react";
import "./OpenShiftsCal.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import leftArrow from "./Arrows/leftarrow.svg";
import rightArrow from "./Arrows/rightarrow.svg";

function Timeslot(props) {
  function CovererRequest() {
    function refreshPage() {
      window.location.reload();
      return;
    }

    function yesClick() {
      fetch("http://localhost:8000/updateopenshifts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sleID: props.userid,
          shiftID: props.id,
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
      window.location.reload();
      return;
    }

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
        top: "40%",
        left: "50%",
        width: "25%",
        height: "35%",
        transform: "translate(-50%, -50%)",
        overflow: 0,
      },
    };

    function timeStringify(num) {
      if (num == 0) {
        return "12:00AM";
      } else if (num > 12) {
        return (num % 12) + ":00PM";
      } else if (num == 12) {
        return "12:00PM";
      } else {
        return num + ":00AM";
      }
    }
    if (props.valid) {
      return (
        <div>
          <button className="AddButton" onClick={openModal}>
            <div className="a"></div>
          </button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {" "}
            <div>
              <h1
                className="AddEmpText"
                ref={(_subtitle) => (subtitle = _subtitle)}
              ></h1>
            </div>
            <div className="question">Would you like to cover this shift?</div>
            <div className="location">Location: {props.location}</div>
            <div className="startTime">
              Start Time: {timeStringify(props.start)}
            </div>
            <div className="endTime">End Time: {timeStringify(props.end)} </div>
            <div className="buttonContainer">
              <button className="YesButton" onClick={yesClick}>
                <div className="YesText">
                  <h4> Yes</h4>
                </div>
              </button>
              <button className="NoButton" onClick={refreshPage}>
                <div className="NoText">
                  <h4>No</h4>
                </div>
              </button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return <div className="AddButton"></div>;
    }
  }
  if (props.valid) {
    return (
      <div class="open-shift" style={{ backgroundColor: props.color }}>
        <CovererRequest />
      </div>
    );
  } else {
    return (
      <div class="not-open-shift" style={{ backgroundColor: props.color }}>
        <CovererRequest />
      </div>
    );
  }
}

class Shift {
  constructor(color, id, start, end, day, sleid, location) {
    this.color = color;
    this.id = id;
    this.start = start;
    this.end = end;
    this.day = day;
    this.sleid = sleid;
    this.location = location;
  }
}

function initialShifts() {
  let a = [];
  for (var i = 0; i < 168; i += 1) {
    a.push(new Shift("#f8f8f8", null, null, null, null, null, null));
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

var emptyShifts = initialShifts();

export default class OpenShiftsCal extends React.Component {
  constructor(props) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    var weekString =
      format(currentDate, "MMMM") +
      " " +
      format(currentDate, "YYYY") +
      ": " +
      format(startOfWeek(currentDate), "MM/DD") +
      " - " +
      format(endOfWeek(currentDate), "MM/DD");
    super(props);
    this.state = {
      shifts: emptyShifts,
      currentDate: currentDate,
      weekString: weekString,
      emptyShifts: emptyShifts,
    };
    this.previousWeek = this.previousWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  componentDidMount() {
    fetch("/openshifts/" + this.props.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.state.emptyShifts,
        userId: this.props.userId,
        currentDate: this.state.currentDate,
        startOfWeek: startOfWeek(this.state.currentDate),
        endOfWeek: endOfWeek(this.state.currentDate),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({ shifts: jsonResponse.shifts });
      });
  }
  previousWeek() {
    let currStartDate = new Date(this.state.currentDate);
    if (Date.parse(currStartDate) < Date.parse(new Date())) {
      return;
    }
    currStartDate.setDate(currStartDate.getDate() - 7);
    var weekStringg =
      format(currStartDate, "MMMM") +
      " " +
      format(currStartDate, "YYYY") +
      ": " +
      format(startOfWeek(currStartDate), "MM/DD") +
      " - " +
      format(endOfWeek(currStartDate), "MM/DD");
    fetch("/openshifts/" + this.props.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.state.emptyShifts,
        userId: this.props.userId,
        currentDate: currStartDate,
        startOfWeek: startOfWeek(currStartDate),
        endOfWeek: endOfWeek(currStartDate),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({
          shifts: jsonResponse.shifts,
          currentDate: currStartDate,
          weekString: weekStringg,
        });
      });
  }

  nextWeek() {
    let currStartDate = new Date(this.state.currentDate);
    currStartDate.setDate(currStartDate.getDate() + 7);
    var weekStringg =
      format(currStartDate, "MMMM") +
      " " +
      format(currStartDate, "YYYY") +
      ": " +
      format(startOfWeek(currStartDate), "MM/DD") +
      " - " +
      format(endOfWeek(currStartDate), "MM/DD");
    fetch("/openshifts/" + this.props.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.state.shifts,
        userId: this.props.userId,
        currentDate: currStartDate,
        startOfWeek: startOfWeek(currStartDate),
        endOfWeek: endOfWeek(currStartDate),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({
          shifts: jsonResponse.shifts,
          currentDate: currStartDate,
          weekString: weekStringg,
        });
      });
  }
  render() {
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

    /* Displays the wkdays header.
     */
    var wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div class="item-wday1">
          {format(addDays(startOfWeek(this.state.currentDate), i), "dd MM/DD")}
        </div>
      );
    }

    /* Maps shift ids to their collective starttimes, endtimes, and locations
     */
    var shiftGrouper = {};
    for (var i = 0; i < 168; i += 1) {
      if (this.state.shifts[i] != null && this.state.shifts[i].id != null) {
        if (this.state.shifts[i].id in shiftGrouper) {
          shiftGrouper[this.state.shifts[i].id][1] += 1;
        } else {
          shiftGrouper[this.state.shifts[i].id] = [
            this.state.shifts[i].start,
            this.state.shifts[i].end,
            this.state.shifts[i].location,
          ];
        }
      }
    }

    /*Every 8th element should be an "item-hours1" header,
      while every 1-7th element should be a shift cell.
      The valid prop tracks if the Timeslot is a clickable, colored cell belonging to a shift or not.
    */
    var timeslots = [];
    for (var i = 0, ti = 0; i < 192; i += 1) {
      if (i % 8 == 0) {
        timeslots.push(<div class="item-hours">{hours[i / 8]}</div>);
      } else {
        if (
          this.state.shifts[ti].sleid == this.props.userId ||
          !(this.state.shifts[ti].id in shiftGrouper)
        ) {
          timeslots.push(
            <Timeslot
              color={this.state.shifts[ti].color}
              id={this.state.shifts[ti].id}
              userid={this.props.userId}
              valid={false}
            />
          );
        } else {
          timeslots.push(
            <Timeslot
              color={this.state.shifts[ti].color}
              id={this.state.shifts[ti].id}
              userid={this.props.userId}
              valid={true}
              start={shiftGrouper[this.state.shifts[ti].id][0]}
              end={shiftGrouper[this.state.shifts[ti].id][1]}
              location={shiftGrouper[this.state.shifts[ti].id][2]}
            />
          );
        }
        ti += 1;
      }
    }

    return (
      <div id="overall-container1">
        <h1 id="yourshifts1">Open Shifts</h1>
        <div id="schedule-container-st1">
          <div id="frontWords1">
            <button className="buttonLeftArrow">
              <img
                className="leftArrow"
                src={leftArrow}
                onClick={this.previousWeek}
                alt="leftArrow"
              />
            </button>
            <h1 id="weekString1">{this.state.weekString}</h1>
            <button className="buttonRightArrow">
              <img
                className="rightArrow"
                src={rightArrow}
                onClick={this.nextWeek}
                alt="rightArrow"
              />
            </button>
          </div>
          <div id="inner-schedule1">
            <div></div>
            {wkdays}
            {timeslots}
          </div>
        </div>
      </div>
    );
  }
}
