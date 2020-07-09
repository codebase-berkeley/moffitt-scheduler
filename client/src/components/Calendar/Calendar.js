import React from "react";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { Redirect } from "react-router-dom";

function Timeslot(props) {
  function timeslotClick() {
    if (
      document.getElementById(props.id).style.backgroundColor ==
      "rgb(176, 233, 194)"
    ) {
      document.getElementById(props.id).style.backgroundColor =
        "rgb(248, 248, 248)";
    } else {
      document.getElementById(props.id).style.backgroundColor =
        "rgb(176, 233, 194)";
    }
  }
  return (
    <button
      style={{ backgroundColor: props.color }}
      id={props.id}
      onClick={timeslotClick}
    ></button>
  );
}

function SaveChanges(props) {
  return (
    <div className="save">
      <button id="saveButton" onClick={props.save}>
        Save Changes
      </button>
    </div>
  );
}

export default class Calendar extends React.Component {
  constructor(props) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    // var weekString =
    //   format(currentDate, "MMMM") +
    //   " " +
    //   format(currentDate, "YYYY") +
    //   ": " +
    //   format(startOfWeek(currentDate), "MM/DD") +
    //   " - " +
    //   format(endOfWeek(currentDate), "MM/DD");
    super(props);
    this.state = {
      schedule: [],
      currentDate: currentDate,
      // weekString: weekString,
      saved: []
    };
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    console.log("In here");
    fetch("/availability", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.schedule === null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        } else {
          this.setState({ schedule: jsonResponse.schedule });
        }
      });
  }

  save() {
    this.state.saved = [];
    for (let i = 0; i < 336; i += 1) {
      if (
        document.getElementById(i).style.backgroundColor ===
        "rgb(176, 233, 194)"
      ) {
        this.state.saved.push(this.state.schedule[i]);
      }
    }

    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.props.userId,
        items: this.state.saved
      })
    }).then(response => {
      return response.json();
    });
  }

  selectClick() {
    var startText = document.getElementById("startText").value;
    console.log(startText);
    var endText = document.getElementById("endText").value;
    console.log(endText);
    var weekdayText = document.getElementById("weekdayText").value;
    console.log(weekdayText);

    var startCellID = 0;
    var endCellID = 0;

    console.log("Start increment:", findIncrement(startText));
    console.log("End increment:", findIncrement(endText));

    if (weekdayText === "Sun") {
      startCellID = findIncrement(startText) * 7 + 0;
      endCellID = findIncrement(endText) * 7 + 0;
    } else if (weekdayText === "Mon") {
      startCellID = findIncrement(startText) * 7 + 1;
      endCellID = findIncrement(endText) * 7 + 1;
    } else if (weekdayText === "Tue") {
      startCellID = findIncrement(startText) * 7 + 2;
      endCellID = findIncrement(endText) * 7 + 2;
    } else if (weekdayText === "Wed") {
      startCellID = findIncrement(startText) * 7 + 3;
      endCellID = findIncrement(endText) * 7 + 3;
    } else if (weekdayText === "Thu") {
      startCellID = findIncrement(startText) * 7 + 4;
      endCellID = findIncrement(endText) * 7 + 4;
    } else if (weekdayText === "Fri") {
      startCellID = findIncrement(startText) * 7 + 5;
      endCellID = findIncrement(endText) * 7 + 5;
    } else if (weekdayText === "Sat") {
      startCellID = findIncrement(startText) * 7 + 6;
      endCellID = findIncrement(endText) * 7 + 6;
    }
    if (startCellID > endCellID) {
      alert("Invalid start and end time!");
    }

    for (var i = startCellID; i < endCellID; i = i + 7) {
      document.getElementById(i).style.backgroundColor = "rgb(176, 233, 194)";
    }
  }

  selectClear() {
    var startText = document.getElementById("startText").value;
    var endText = document.getElementById("endText").value;
    var weekdayText = document.getElementById("weekdayText").value;

    if (weekdayText === "Sun") {
      var startCellID = findIncrement(startText) * 7 + 0;
      var endCellID = findIncrement(endText) * 7 + 0;
    } else if (weekdayText === "Mon") {
      startCellID = findIncrement(startText) * 7 + 1;
      endCellID = findIncrement(endText) * 7 + 1;
    } else if (weekdayText === "Tue") {
      startCellID = findIncrement(startText) * 7 + 2;
      endCellID = findIncrement(endText) * 7 + 2;
    } else if (weekdayText === "Wed") {
      startCellID = findIncrement(startText) * 7 + 3;
      endCellID = findIncrement(endText) * 7 + 3;
    } else if (weekdayText === "Thu") {
      startCellID = findIncrement(startText) * 7 + 4;
      endCellID = findIncrement(endText) * 7 + 4;
    } else if (weekdayText === "Fri") {
      startCellID = findIncrement(startText) * 7 + 5;
      endCellID = findIncrement(endText) * 7 + 5;
    } else if (weekdayText === "Sat") {
      startCellID = findIncrement(startText) * 7 + 6;
      endCellID = findIncrement(endText) * 7 + 6;
    }
    if (startCellID > endCellID) {
      alert("Invalid start and end time!");
    }
    for (var i = startCellID; i < endCellID; i = i + 7) {
      document.getElementById(i).style.backgroundColor = "rgb(248, 248, 248)";
    }
  }

  render() {
    if (this.state.redirect) {
      return this.state.redirect;
    }

    const hours = [];
    for (let i = 0, hr = 12; i < 48; i += 1) {
      i % 2 === 1 ? hours.push(hr + ":30") : hours.push(hr + ":00");
      if (hr === 12 && i % 2 === 1) {
        hr = 0;
      }
      if (i % 2 === 1) {
        hr += 1;
      }
    }
    for (let i = 0; i < hours.length; i += 1) {
      if (i < hours.length / 2) {
        hours[i] += "am";
      } else {
        hours[i] += "pm";
      }
    }

    /* Displays the wkdays header.
     */
    var wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div class="item-wday">
          {format(addDays(startOfWeek(this.state.currentDate), i), "ddd")}
        </div>
      );
    }

    /*Every 8th element should be an "item-hours" header,
      while every 1-7th element should be a shift cell.
      The valid prop tracks if the Timeslot is a clickable, colored cell belonging to a shift or not.
    */
    var timeslots = [];
    for (var i = 0, ti = 0; i < 384; i += 1) {
      if (i % 8 === 0) {
        timeslots.push(<div class="item-hours">{hours[i / 8]}</div>);
      } else if (this.state.schedule.length > 0) {
        timeslots.push(
          <Timeslot color={this.state.schedule[ti].color} id={ti} />
        );
        ti += 1;
      }
    }

    return (
      <div id="overall-container">
        <div id="schedule-container">
          {/* <h1 id="weekString">{this.state.weekString}</h1> */}
          <div className="weekdayStuff">
            <div className="weekdayText1">Weekday</div>
            <div className="emptySpace"></div>
            <select id="weekdayText">
              <option value="Sun">Sun</option>
              <option value="Mon">Mon</option>
              <option value="Tue">Tue</option>
              <option value="Wed">Wed</option>
              <option value="Thu">Thu</option>
              <option value="Fri">Fri</option>
              <option value="Sat">Sat</option>
            </select>{" "}
          </div>
          <div className="emptySpace"></div>
          <div className="startStuff">
            <div className="startText">Start Time</div>
            <input
              className="startInput"
              id="startText"
              type="time"
              step="1800"
              defaultValue="08:00"
            ></input>
          </div>
          <div className="emptySpace"></div>
          <div className="startEnd">
            <div className="endText">End Time</div>
            <input
              className="endInput"
              id="endText"
              type="time"
              step="1800"
              defaultValue="10:00"
            ></input>
            <button className="selectButton" onClick={this.selectClick}>
              Select
            </button>
            <button className="clearButton" onClick={this.selectClear}>
              Clear
            </button>
            <div className="saveChanges">
              <SaveChanges save={this.save} />
            </div>
          </div>
          <div className="separator"></div>
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

function findIncrement(time) {
  if (time === "00:00") {
    var increment = 0;
  } else if (time === "00:30") {
    var increment = 1;
  } else if (time === "01:00") {
    var increment = 2;
  } else if (time === "01:30") {
    var increment = 3;
  } else if (time === "02:00") {
    var increment = 4;
  } else if (time === "02:30") {
    var increment = 5;
  } else if (time === "03:00") {
    var increment = 6;
  } else if (time === "03:30") {
    var increment = 7;
  } else if (time === "04:00") {
    var increment = 8;
  } else if (time === "04:30") {
    var increment = 9;
  } else if (time === "05:00") {
    var increment = 10;
  } else if (time === "05:30") {
    var increment = 11;
  } else if (time === "06:00") {
    var increment = 12;
  } else if (time === "06:30") {
    var increment = 13;
  } else if (time === "07:00") {
    var increment = 14;
  } else if (time === "07:30") {
    var increment = 15;
  } else if (time === "08:00") {
    var increment = 16;
  } else if (time === "08:30") {
    var increment = 17;
  } else if (time === "09:00") {
    var increment = 18;
  } else if (time === "09:30") {
    var increment = 19;
  } else if (time === "10:00") {
    var increment = 20;
  } else if (time === "10:30") {
    var increment = 21;
  } else if (time === "11:00") {
    var increment = 22;
  } else if (time === "11:30") {
    var increment = 23;
  } else if (time === "12:00") {
    var increment = 24;
  } else if (time === "12:30") {
    var increment = 25;
  } else if (time === "13:00") {
    var increment = 26;
  } else if (time === "13:30") {
    var increment = 27;
  } else if (time === "14:00") {
    var increment = 28;
  } else if (time === "14:30") {
    var increment = 29;
  } else if (time === "15:00") {
    var increment = 30;
  } else if (time === "15:30") {
    var increment = 31;
  } else if (time === "16:00") {
    var increment = 32;
  } else if (time === "16:30") {
    var increment = 33;
  } else if (time === "17:00") {
    var increment = 34;
  } else if (time === "17:30") {
    var increment = 35;
  } else if (time === "18:00") {
    var increment = 36;
  } else if (time === "18:30") {
    var increment = 37;
  } else if (time === "19:00") {
    var increment = 38;
  } else if (time === "19:30") {
    var increment = 39;
  } else if (time === "20:00") {
    var increment = 40;
  } else if (time === "20:30") {
    var increment = 41;
  } else if (time === "21:00") {
    var increment = 42;
  } else if (time === "21:30") {
    var increment = 43;
  } else if (time === "22:00") {
    var increment = 44;
  } else if (time === "22:30") {
    var increment = 45;
  } else if (time === "23:00") {
    var increment = 46;
  } else if (time === "23:30") {
    var increment = 47;
  } else {
    alert("Please select start and end times in half hour increments!");
  }
  return increment;
}
