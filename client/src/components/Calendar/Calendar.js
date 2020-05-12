import React from "react";
import ScheduleSelector from "react-schedule-selector";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek, getDay, getHours } from "date-fns";
import { Redirect } from "react-router-dom";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [], formattedSchedule: [], redirect: null };

    this.deselectCell = <div class="deselectCell"></div>;
    this.selectCell = <div class="selectCell"></div>;
    this.save = this.save.bind(this);

    this.currentDate = new Date();
    this.weekString =
      format(this.currentDate, "MMMM") +
      " " +
      format(this.currentDate, "YYYY") +
      ": " +
      format(startOfWeek(this.currentDate), "MM/DD") +
      " - " +
      format(endOfWeek(this.currentDate), "MM/DD");
  }

  save() {
    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: this.state.formattedSchedule,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.schedule == null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        }
      });
  }

  handleChange = (newSchedule) => {
    var schedule2 = [];
    for (var i = 0; i < newSchedule.length; i += 1) {
      schedule2.push([getHours(newSchedule[i]), getDay(newSchedule[i])]);
    }
    this.setState({ schedule: newSchedule, formattedSchedule: schedule2 });
  };

  renderCustomDateCell = (time, selected, innerRef) => {
    return (
      <div style={{ textAlign: "center" }} ref={innerRef}>
        {selected ? this.selectCell : this.deselectCell}
      </div>
    );
  };

  componentDidMount() {
    fetch("/availability")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("LOOK HERE SAHIL");
        if (jsonResponse.schedule == null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        } else {
          this.setState({ schedule: jsonResponse.schedule });
        }
      });
  }

  render() {
    return (
      <div id="overall-container">
        {this.state.redirect}
        <h1 className="availabilityHeader" id="selectavail">
          Select Availabilities
        </h1>
        <SaveChanges save={this.save} />
        <div id="schedule-container">
          <h1 id="weekString">{this.weekString}</h1>
          <ScheduleSelector
            startDate={startOfWeek(this.currentDate)}
            selection={this.state.schedule}
            numDays={7}
            minTime={0}
            maxTime={23}
            dateFormat="dd MM/DD"
            renderDateCell={this.renderCustomDateCell}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
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
