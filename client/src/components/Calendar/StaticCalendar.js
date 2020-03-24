import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

function Timeslot(props) {
  return <div class="item-cell" style={{ backgroundColor: props.color }}></div>;
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
    this.state = { shifts: initialShifts() };
  }

  componentDidMount() {
    fetch("/staticcalendar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: this.state.shifts })
    })
      .then(response => {
        console.log("response");
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse.shifts);
        this.setState({ shifts: jsonResponse.shifts });
      });
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
      "11pm"
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

    return (
      <div id="overall-container">
        <div id="schedule-container-st">
          <h1 id="weekString">{weekString}</h1>
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
