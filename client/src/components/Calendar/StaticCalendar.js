import React from "react";
import "./StaticCalendar.css";

import {
  getBlankSleSchedule,
  days,
  abbrevs,
  months,
  getStartOfWeek,
  getDatePlusX,
  timeToString
} from "../../utils";

class YourShifts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: getBlankSleSchedule("none"),
      week: getStartOfWeek()
    };
  }

  render() {
    return (
      <div>
        <WeekLabel week={this.state.week} />
        <ColorKey />
        <Calendar schedule={this.state.schedule} week={this.state.week} />
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
      var location = props.schedule[abbrevs[days[d]]][t];
      time.push(
        <Slot
          key={d}
          sc={props.sc}
          date={getDatePlusX(props.week, d)}
          time={t}
          location={location}
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

function Slot(props) {
  return (
    <td className="sle-slot">
      <div className={"sle-slot-back " + "slot-" + props.location}></div>
    </td>
  );
}

function DayLabel(props) {
  return (
    <td className="sle-day-cont">
      <div className="sle-day-label">
        {props.day} {props.date.getMonth() + 1}/{props.date.getDate()}
      </div>
    </td>
  );
}

function TimeLabel(props) {
  return (
    <td className="sle-time-cont">
      <div className="sle-time-label">{timeToString(props.time)}</div>
    </td>
  );
}

function WeekLabel(props) {
  var startDay = props.week;
  var lastDay = new Date(startDay);
  lastDay.setDate(lastDay.getDate() + 6);

  return (
    <div className="week-label">
      <h2>
        {months[startDay.getMonth()] +
          " " +
          startDay.getFullYear() +
          ": " +
          shortDate(startDay) +
          " - " +
          shortDate(lastDay)}
      </h2>
    </div>
  );
}

// Necessarily hard-cody
function ColorKey(props) {
  return (
    <div className="color-key">
      <h3>Moffitt 3rd</h3>
      <div className="color-box slot-moffitt3"></div>

      <h3>Moffitt 4th</h3>
      <div className="color-box slot-moffitt4"></div>

      <h3>Main Stacks</h3>
      <div className="color-box slot-main"></div>

      <h3>Cover Requested</h3>
      <div className="color-box slot-cover"></div>
    </div>
  );
}

function shortDate(date) {
  return date.getMonth() + 1 + "/" + date.getDate();
}

export default YourShifts;
