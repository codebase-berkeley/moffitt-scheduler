import React from "react";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek, getDay, getHours } from "date-fns";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [], formattedSchedule: [] };

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
    console.log(this.state.formattedSchedule);
    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.props.userId,
        items: this.state.formattedSchedule,
      }),
    }).then((response) => {
      return response.json();
    });
  }

  handleChange = (newSchedule) => {
    var schedule2 = [];
    for (
      var i = 0, thirtyMin = false;
      i < newSchedule.length;
      i += 1, thirtyMin = !thirtyMin
    ) {
      if (!thirtyMin) {
        schedule2.push([getHours(newSchedule[i]), getDay(newSchedule[i])]);
      } else {
        schedule2.push([
          getHours(newSchedule[i]) + 0.5,
          getDay(newSchedule[i]),
        ]);
      }
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
    fetch("/availability/" + this.props.userId)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({ schedule: jsonResponse.schedule });
      });
  }

  render() {
    return (
      <div id="overall-container">
        <h1 className="availabilityHeader" id="selectavail">
          Select Availabilities
        </h1>
        <SaveChanges save={this.save} />
        <div id="schedule-container">
          <h1 id="weekString">{this.weekString}</h1>
          <div
            startDate={startOfWeek(this.currentDate)}
            selection={this.state.schedule}
            numDays={7}
            minTime={0}
            maxTime={24}
            dateFormat="dd MM/DD"
            hourlyChunks={2}
            timeFormat={"h:mma"}
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
