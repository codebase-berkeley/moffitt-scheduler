import React from "react";
import "./Calendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

function Timeslot(props) {
  function timeslotClick() {
    if (
      document.getElementById(props.id).style.backgroundColor ==
      "rgb(176, 233, 194)"
    ) {
      document.getElementById(props.id).style.backgroundColor =
        "rgb(248, 248, 248)";
    } else {
      document.getElementById(props.id).style.backgroundColor =
        "rgb(176, 233, 194)";
    }
  }
  return (
    <button
      style={{ backgroundColor: props.color }}
      id={props.id}
      onClick={timeslotClick}
    ></button>
  );
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
    // var weekString =
    //   format(currentDate, "MMMM") +
    //   " " +
    //   format(currentDate, "YYYY") +
    //   ": " +
    //   format(startOfWeek(currentDate), "MM/DD") +
    //   " - " +
    //   format(endOfWeek(currentDate), "MM/DD");
    super(props);
    this.state = {
      schedule: [],
      currentDate: currentDate,
      // weekString: weekString,
      saved: [],
    };
    this.save = this.save.bind(this);
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

  save() {
    this.state.saved = [];
    for (let i = 0; i < 336; i += 1) {
      if (
        document.getElementById(i).style.backgroundColor == "rgb(176, 233, 194)"
      ) {
        this.state.saved.push(this.state.schedule[i]);
      }
    }
    console.log(this.state.saved);
    fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.props.userId,
        items: this.state.saved,
      }),
    }).then((response) => {
      return response.json();
    });
  }
  selectClick() {
    var startText = document.getElementById("startText").value;
    console.log(startText);
    var endText = document.getElementById("endText").value;
    console.log(endText);
    var weekdayText = document.getElementById("weekdayText").value;
    console.log(weekdayText);
    function findIncrement(time) {
      if (time == "00:00") {
        var increment = 0;
      }
      if (time == "00:30") {
        var increment = 1;
      }
      if (time == "01:00") {
        var increment = 2;
      }
      if (time == "01:30") {
        var increment = 3;
      }
      if (time == "02:00") {
        var increment = 4;
      }
      if (time == "02:30") {
        var increment = 5;
      }
      if (time == "03:00") {
        var increment = 6;
      }
      if (time == "03:30") {
        var increment = 7;
      }
      if (time == "04:00") {
        var increment = 8;
      }
      if (time == "04:30") {
        var increment = 9;
      }
      if (time == "05:00") {
        var increment = 10;
      }
      if (time == "05:30") {
        var increment = 11;
      }
      if (time == "06:00") {
        var increment = 12;
      }
      if (time == "06:30") {
        var increment = 13;
      }
      if (time == "07:00") {
        var increment = 14;
      }
      if (time == "07:30") {
        var increment = 15;
      }
      if (time == "08:00") {
        var increment = 16;
      }
      if (time == "08:30") {
        var increment = 17;
      }
      if (time == "09:00") {
        var increment = 18;
      }
      if (time == "09:30") {
        var increment = 19;
      }
      if (time == "10:00") {
        var increment = 20;
      }
      if (time == "10:30") {
        var increment = 21;
      }
      if (time == "11:00") {
        var increment = 22;
      }
      if (time == "11:30") {
        var increment = 23;
      }
      if (time == "12:00") {
        var increment = 24;
      }
      if (time == "12:30") {
        var increment = 25;
      }
      if (time == "13:00") {
        var increment = 26;
      }
      if (time == "13:30") {
        var increment = 27;
      }
      if (time == "14:00") {
        var increment = 28;
      }
      if (time == "14:30") {
        var increment = 29;
      }
      if (time == "15:00") {
        var increment = 30;
      }
      if (time == "15:30") {
        var increment = 31;
      }
      if (time == "16:00") {
        var increment = 32;
      }
      if (time == "16:30") {
        var increment = 33;
      }
      if (time == "17:00") {
        var increment = 34;
      }
      if (time == "17:30") {
        var increment = 35;
      }
      if (time == "18:00") {
        var increment = 36;
      }
      if (time == "18:30") {
        var increment = 37;
      }
      if (time == "19:00") {
        var increment = 38;
      }
      if (time == "19:30") {
        var increment = 39;
      }
      if (time == "20:00") {
        var increment = 40;
      }
      if (time == "20:30") {
        var increment = 41;
      }
      if (time == "21:00") {
        var increment = 42;
      }
      if (time == "21:30") {
        var increment = 43;
      }
      if (time == "22:00") {
        var increment = 44;
      }
      if (time == "22:30") {
        var increment = 45;
      }
      if (time == "23:00") {
        var increment = 46;
      }
      if (time == "23:30") {
        var increment = 47;
      }
      return increment;
    }
    if (weekdayText == "Sun") {
      var startCellID = findIncrement(startText) * 7 + 0;
      var endCellID = findIncrement(endText) * 7 + 0;
    }
    if (weekdayText == "Mon") {
      startCellID = findIncrement(startText) * 7 + 1;
      endCellID = findIncrement(endText) * 7 + 1;
    }
    if (weekdayText == "Tues") {
      startCellID = findIncrement(startText) * 7 + 2;
      endCellID = findIncrement(endText) * 7 + 2;
    }
    if (weekdayText == "Wed") {
      startCellID = findIncrement(startText) * 7 + 3;
      endCellID = findIncrement(endText) * 7 + 3;
    }
    if (weekdayText == "Thur") {
      startCellID = findIncrement(startText) * 7 + 4;
      endCellID = findIncrement(endText) * 7 + 4;
    }
    if (weekdayText == "Fri") {
      startCellID = findIncrement(startText) * 7 + 5;
      endCellID = findIncrement(endText) * 7 + 5;
    }
    if (weekdayText == "Sat") {
      startCellID = findIncrement(startText) * 7 + 6;
      endCellID = findIncrement(endText) * 7 + 6;
    }

    for (var i = startCellID; i < endCellID; i = i + 7) {
      document.getElementById(i).style.backgroundColor = "rgb(176, 233, 194)";
    }
  }
  selectClear() {
    var startText = document.getElementById("startText").value;
    console.log(startText);
    var endText = document.getElementById("endText").value;
    console.log(endText);
    var weekdayText = document.getElementById("weekdayText").value;
    console.log(weekdayText);
    function findIncrement(time) {
      if (time == "00:00") {
        var increment = 0;
      }
      if (time == "00:30") {
        var increment = 1;
      }
      if (time == "01:00") {
        var increment = 2;
      }
      if (time == "01:30") {
        var increment = 3;
      }
      if (time == "02:00") {
        var increment = 4;
      }
      if (time == "02:30") {
        var increment = 5;
      }
      if (time == "03:00") {
        var increment = 6;
      }
      if (time == "03:30") {
        var increment = 7;
      }
      if (time == "04:00") {
        var increment = 8;
      }
      if (time == "04:30") {
        var increment = 9;
      }
      if (time == "05:00") {
        var increment = 10;
      }
      if (time == "05:30") {
        var increment = 11;
      }
      if (time == "06:00") {
        var increment = 12;
      }
      if (time == "06:30") {
        var increment = 13;
      }
      if (time == "07:00") {
        var increment = 14;
      }
      if (time == "07:30") {
        var increment = 15;
      }
      if (time == "08:00") {
        var increment = 16;
      }
      if (time == "08:30") {
        var increment = 17;
      }
      if (time == "09:00") {
        var increment = 18;
      }
      if (time == "09:30") {
        var increment = 19;
      }
      if (time == "10:00") {
        var increment = 20;
      }
      if (time == "10:30") {
        var increment = 21;
      }
      if (time == "11:00") {
        var increment = 22;
      }
      if (time == "11:30") {
        var increment = 23;
      }
      if (time == "12:00") {
        var increment = 24;
      }
      if (time == "12:30") {
        var increment = 25;
      }
      if (time == "13:00") {
        var increment = 26;
      }
      if (time == "13:30") {
        var increment = 27;
      }
      if (time == "14:00") {
        var increment = 28;
      }
      if (time == "14:30") {
        var increment = 29;
      }
      if (time == "15:00") {
        var increment = 30;
      }
      if (time == "15:30") {
        var increment = 31;
      }
      if (time == "16:00") {
        var increment = 32;
      }
      if (time == "16:30") {
        var increment = 33;
      }
      if (time == "17:00") {
        var increment = 34;
      }
      if (time == "17:30") {
        var increment = 35;
      }
      if (time == "18:00") {
        var increment = 36;
      }
      if (time == "18:30") {
        var increment = 37;
      }
      if (time == "19:00") {
        var increment = 38;
      }
      if (time == "19:30") {
        var increment = 39;
      }
      if (time == "20:00") {
        var increment = 40;
      }
      if (time == "20:30") {
        var increment = 41;
      }
      if (time == "21:00") {
        var increment = 42;
      }
      if (time == "21:30") {
        var increment = 43;
      }
      if (time == "22:00") {
        var increment = 44;
      }
      if (time == "22:30") {
        var increment = 45;
      }
      if (time == "23:00") {
        var increment = 46;
      }
      if (time == "23:30") {
        var increment = 47;
      }
      return increment;
    }
    if (weekdayText == "Sun") {
      var startCellID = findIncrement(startText) * 7 + 0;
      var endCellID = findIncrement(endText) * 7 + 0;
    }
    if (weekdayText == "Mon") {
      startCellID = findIncrement(startText) * 7 + 1;
      endCellID = findIncrement(endText) * 7 + 1;
    }
    if (weekdayText == "Tues") {
      startCellID = findIncrement(startText) * 7 + 2;
      endCellID = findIncrement(endText) * 7 + 2;
    }
    if (weekdayText == "Wed") {
      startCellID = findIncrement(startText) * 7 + 3;
      endCellID = findIncrement(endText) * 7 + 3;
    }
    if (weekdayText == "Thur") {
      startCellID = findIncrement(startText) * 7 + 4;
      endCellID = findIncrement(endText) * 7 + 4;
    }
    if (weekdayText == "Fri") {
      startCellID = findIncrement(startText) * 7 + 5;
      endCellID = findIncrement(endText) * 7 + 5;
    }
    if (weekdayText == "Sat") {
      startCellID = findIncrement(startText) * 7 + 6;
      endCellID = findIncrement(endText) * 7 + 6;
    }

    for (var i = startCellID; i < endCellID; i = i + 7) {
      document.getElementById(i).style.backgroundColor = "rgb(248, 248, 248)";
    }
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
          {format(addDays(startOfWeek(this.state.currentDate), i), "ddd")}
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
        <h1 id="avails">Select Availability</h1>
        <div id="schedule-container">
          {/* <h1 id="weekString">{this.state.weekString}</h1> */}
          <div className="weekdayStuff">
            <div className="weekdayText1">Weekday</div>
            <div className="emptySpace"></div>
            <select id="weekdayText">
              <option value="Sun">Sun</option>
              <option value="Mon">Mon</option>
              <option value="Tue">Tue</option>
              <option value="Wed">Wed</option>
              <option value="Thu">Thu</option>
              <option value="Fri">Fri</option>
              <option value="Sat">Sat</option>
            </select>{" "}
          </div>
          <div className="emptySpace"></div>
          <div className="startStuff">
            <div className="startText">Start Time</div>
            <input
              className="startInput"
              id="startText"
              type="time"
              step="1800"
              defaultValue="08:00"
            ></input>
          </div>
          <div className="emptySpace"></div>
          <div className="startEnd">
            <div className="endText">End Time</div>
            <input
              className="endInput"
              id="endText"
              type="time"
              step="1800"
              defaultValue="18:00"
            ></input>
            <button className="selectButton" onClick={this.selectClick}>
              Select
            </button>
            <button className="clearButton" onClick={this.selectClear}>
              Clear
            </button>
            <div className="saveChanges">
              <SaveChanges save={this.save} />
            </div>
          </div>
          <div className="separator"></div>
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
