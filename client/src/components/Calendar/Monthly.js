import React from "react";
import "./Monthly.css"
import ScheduleSelector from 'react-schedule-selector'

export default class Monthly extends React.Component {

    state = { schedule: [] }

    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    render() {
      return (
          <ScheduleSelector
            selection={this.state.schedule}
            onChange={this.handleChange}
        />
      );
    }
}