import React from "react";
import ScheduleSelector from "react-schedule-selector";
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
    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: this.state.formattedSchedule })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
  }

  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule });
    this.setState({ formattedSchedule: [] });
    for (var i = 0; i < newSchedule.length; i += 1) {
      this.state.formattedSchedule.push([
        getHours(newSchedule[i]),
        getDay(newSchedule[i])
      ]);
    }
    console.log(this.state.formattedSchedule);
  };

  renderCustomDateCell = (time, selected, innerRef) => {
    return (
      <div style={{ textAlign: "center" }} ref={innerRef}>
        {selected ? this.selectCell : this.deselectCell}
      </div>
    );
  };

  componentDidMount() {
    console.log("mount");
    console.log(this.props.userId);
    fetch("/test/" + this.props.userId)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log("test", jsonResponse);
        this.setState({ schedule: jsonResponse.schedule });
      });
  }

  // componentDidMount() {
  //   console.log("mount");
  //   fetch("/calendar")
  //     .then(response => {
  //       console.log("response");
  //       return response.json();
  //     })
  //     .then(jsonResponse => {
  //       console.log("test");
  //       this.setState({ grid: jsonResponse.schedule });
  //     });
  // }

  render() {
    // let userId = useParams();
    // console.log(userId);
    return (
      <div id="overall-container">
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
