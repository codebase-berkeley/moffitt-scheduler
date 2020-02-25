import React from "react";
import "./Calendar.css";
import ScheduleSelector from "react-schedule-selector";
import { getDay, startOfWeek, weekStartsOn } from "date-fns";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [] };

    this.deselectCell = <div class="deselectCell"></div>;
    this.selectCell = <div class="selectCell"></div>;
  }

  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule });
  };

  renderCustomDateCell = (time, selected, innerRef) => (
    <div style={{ textAlign: "center" }} ref={innerRef}>
      {selected ? this.selectCell : this.deselectCell}
    </div>
  );

  currentDate = getDay(new Date());

  render() {
    return (
      <div id="overall-container">
        <h1>{this.currentDate}</h1>
        <div class="schedule-container">
          <ScheduleSelector
            startDate={startOfWeek(new Date(), { weekStartsOn: 0 })}
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
