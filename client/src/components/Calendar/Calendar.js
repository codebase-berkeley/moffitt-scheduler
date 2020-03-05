import React from "react";
import ScheduleSelector from "react-schedule-selector";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek } from "date-fns";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [] };

    this.deselectCell = <div class="deselectCell"></div>;
    this.selectCell = <div class="selectCell"></div>;

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
    console.log("In save");
    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: this.state.schedule })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log("json response:", jsonResponse);
      });
  }

  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule });
  };

  renderCustomDateCell = (time, selected, innerRef) => (
    <div style={{ textAlign: "center" }} ref={innerRef}>
      {selected ? this.selectCell : this.deselectCell}
    </div>
  );

  render() {
    if (this.state.schedule.length != 0) {
      this.save();
    }
    return (
      <div id="overall-container">
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
