import React from "react";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

function Timeslot(props) {
  if (props.color == "green") {
    return (
      <button
        // className="availButton"
        // class="item-cell"
        style={{ backgroundColor: "grey" }}
        id={props.id}
        onClick={props.onClick}
      ></button>
    );
  }
  if (props.color == "grey") {
    return (
      <button
        // className="availButton"
        // class="item-cell"
        style={{ backgroundColor: "green" }}
        id={props.id}
        onClick={props.onClick}
      ></button>
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

export default class Calendar extends React.Component {
  constructor(props) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    var weekString =
      format(currentDate, "MMMM") +
      " " +
      format(currentDate, "YYYY") +
      ": " +
      format(startOfWeek(currentDate), "MM/DD") +
      " - " +
      format(endOfWeek(currentDate), "MM/DD");
    super(props);
    this.state = {
      schedule: [],
      currentDate: currentDate,
      weekString: weekString,
    };
  }

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
    const hours = [];
    for (let i = 0, hr = 12; i < 48; i += 1) {
      i % 2 == 1 ? hours.push(hr + ":30") : hours.push(hr + ":00");
      if (hr == 12 && i % 2 == 1) {
        hr = 0;
      }
      if (i % 2 == 1) {
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
          {format(addDays(startOfWeek(this.state.currentDate), i), "dd MM/DD")}
        </div>
      );
    }

    /*Every 8th element should be an "item-hours" header,
      while every 1-7th element should be a shift cell.
      The valid prop tracks if the Timeslot is a clickable, colored cell belonging to a shift or not.
    */
    var timeslots = [];
    for (var i = 0, ti = 0; i < 384; i += 1) {
      if (i % 8 == 0) {
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
        <h1 id="avails">Select Availabilities</h1>
        <div id="schedule-container">
          <h1 id="weekString">{this.state.weekString}</h1>
          <SaveChanges save={this.save} />
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

// import React from "react";
// import "./Calendar.css";
// import { format, startOfWeek, endOfWeek, getDay, getHours } from "date-fns";

// export default class Calendar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { schedule: [], formattedSchedule: [] };

//     this.deselectCell = <div class="deselectCell"></div>;
//     this.selectCell = <div class="selectCell"></div>;
//     this.save = this.save.bind(this);

//     this.currentDate = new Date();
//     this.weekString =
//       format(this.currentDate, "MMMM") +
//       " " +
//       format(this.currentDate, "YYYY") +
//       ": " +
//       format(startOfWeek(this.currentDate), "MM/DD") +
//       " - " +
//       format(endOfWeek(this.currentDate), "MM/DD");
//   }

//   save() {
//     console.log(this.state.formattedSchedule);
//     fetch("/save", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: this.props.userId,
//         items: this.state.formattedSchedule,
//       }),
//     }).then((response) => {
//       return response.json();
//     });
//   }

//   handleChange = (newSchedule) => {
//     var schedule2 = [];
//     for (
//       var i = 0, thirtyMin = false;
//       i < newSchedule.length;
//       i += 1, thirtyMin = !thirtyMin
//     ) {
//       if (!thirtyMin) {
//         schedule2.push([getHours(newSchedule[i]), getDay(newSchedule[i])]);
//       } else {
//         schedule2.push([
//           getHours(newSchedule[i]) + 0.5,
//           getDay(newSchedule[i]),
//         ]);
//       }
//     }
//     this.setState({ schedule: newSchedule, formattedSchedule: schedule2 });
//   };

//   renderCustomDateCell = (time, selected, innerRef) => {
//     return (
//       <div style={{ textAlign: "center" }} ref={innerRef}>
//         {selected ? this.selectCell : this.deselectCell}
//       </div>
//     );
//   };

//   componentDidMount() {
//     fetch("/availability/" + this.props.userId)
//       .then((response) => {
//         return response.json();
//       })
//       .then((jsonResponse) => {
//         this.setState({ schedule: jsonResponse.schedule });
//       });
//   }

//   render() {
//     return (
//       <div id="overall-container">
//         <h1 className="availabilityHeader" id="selectavail">
//           Select Availabilities
//         </h1>
//         <SaveChanges save={this.save} />
//         <div id="schedule-container">
//           <h1 id="weekString">{this.weekString}</h1>
//           <div
//             startDate={startOfWeek(this.currentDate)}
//             selection={this.state.schedule}
//             numDays={7}
//             minTime={0}
//             maxTime={24}
//             dateFormat="dd MM/DD"
//             hourlyChunks={2}
//             timeFormat={"h:mma"}
//             renderDateCell={this.renderCustomDateCell}
//             onChange={this.handleChange}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// function SaveChanges(props) {
//   return (
//     <div className="save">
//       <button id="saveButton" onClick={props.save}>
//         Save Changes
//       </button>
//     </div>
//   );
// }
