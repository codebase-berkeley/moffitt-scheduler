import React from "react";
import "./StaticCalendar.css";

import Modal from "react-modal";

import { Redirect } from "react-router-dom";

import {
  getBlankSleSchedule,
  days,
  abbrevs,
  months,
  getStartOfWeek,
  getDatePlusX,
  timeToString,
  modalStyles,
  shortDate
} from "../../utils";

class OpenShifts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: getBlankSleSchedule({ location: "none", shift: null }),
      week: getStartOfWeek(),
      modalOpen: false,
      modalDate: null,
      modalTime: null,
      modalShift: null,
      redirect: null
    };

    this.leftScrollClick = this.leftScrollClick.bind(this);
    this.rightScrollClick = this.rightScrollClick.bind(this);
    this.slotClick = this.slotClick.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.getModal = this.getModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
  }

  slotClick(date, time, location, shiftId) {
    if (location === "none") {
      return;
    }

    this.setState({
      modalOpen: true,
      modalDate: date,
      modalTime: time,
      modalShift: shiftId
    });
  }

  leftScrollClick() {
    var newWeek = new Date(this.state.week);
    newWeek.setDate(newWeek.getDate() - 7);
    this.setState({ week: newWeek }, this.fetchData);
  }

  rightScrollClick() {
    var newWeek = new Date(this.state.week);
    newWeek.setDate(newWeek.getDate() + 7);
    this.setState({ week: newWeek }, this.fetchData);
  }

  fetchData() {
    fetch("/api/openshifts", {
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
        if (json.noAuth) {
          this.setState({ redirect: <Redirect to="/login" /> });
          return;
        }

        console.log("Schedule: ", json.schedule);

        this.setState({ schedule: json.schedule });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  submitModal() {
    fetch("/api/covershift", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shiftId: this.state.modalShift
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.noAuth) {
          this.setState({ redirect: <Redirect to="/login" /> });
          return;
        }

        if (json.successful) {
          var schedule = JSON.parse(JSON.stringify(this.state.schedule));

          schedule[abbrevs[days[this.state.modalDate.getDay()]]][
            this.state.modalTime
          ] = "none";
          this.setState({ schedule: schedule });
        }
      });

    this.closeModal();
  }

  getModal() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={modalStyles}
        className="cover-modal"
        ariaHideApp={false}
      >
        <button className="close-modal" onClick={this.closeModal}>
          X
        </button>
        <p>
          Would you like to cover the shift on {shortDate(this.state.modalDate)}{" "}
          @{timeToString(this.state.modalTime)}?
        </p>

        <button
          className="basic-button cover-button"
          onClick={this.submitModal}
        >
          Yes
        </button>

        <button
          className="basic-button cover-button cancel-button second-button"
          onClick={this.closeModal}
        >
          Cancel
        </button>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.state.redirect}
        {this.getModal()}
        <WeekLabel
          week={this.state.week}
          lc={this.leftScrollClick}
          rc={this.rightScrollClick}
        />
        <ColorKey />
        <Calendar
          schedule={this.state.schedule}
          week={this.state.week}
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
      var location = props.schedule[abbrevs[days[d]]][t].location;
      var shift = props.schedule[abbrevs[days[d]]][t].shift;

      time.push(
        <Slot
          key={d}
          sc={props.sc}
          date={getDatePlusX(props.week, d)}
          time={t}
          location={location}
          shift={shift}
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
      <div
        onClick={() =>
          props.sc(props.date, props.time, props.location, props.shift)
        }
        className={"sle-slot-back slot-" + props.location}
      ></div>
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
      <button className="left-scroll" onClick={props.lc}>
        &lt;
      </button>
      <h2>
        {months[startDay.getMonth()] +
          " " +
          startDay.getFullYear() +
          ": " +
          shortDate(startDay) +
          " - " +
          shortDate(lastDay)}
      </h2>
      <button className="right-scroll" onClick={props.rc}>
        &gt;
      </button>
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

export default OpenShifts;
