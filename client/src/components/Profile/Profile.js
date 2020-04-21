import React from "react";
import "./Profile.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import ScheduleSelector from "react-schedule-selector";
import starImage from "./baseline_grade_white_18dp.png";
import DisplayLibs from "./DisplayLibs";

function Timeslot(props) {
  return (
    <div
      className="item-cell"
      style={{ backgroundColor: props.color }}
      id={props.id}
    ></div>
  );
}

class Shift {
  constructor(color, id, start, end, day) {
    this.color = color;
    this.id = id;
    this.start = start;
    this.end = end;
    this.day = day;
  }
}

function initialShifts() {
  let a = [];
  for (var i = 0; i < 168; i += 1) {
    a.push(new Shift("#f8f8f8", null, null, null, null));
  }
  let count = 0;
  for (var i = 0; i <= 23; i += 1) {
    for (var j = 0; j <= 6; j += 1) {
      a[count].start = i;
      a[count].end = i + 1;
      a[count].day = j;
      count += 1;
    }
  }
  return a;
}

var currentDate = new Date();
var weekString =
  format(currentDate, "MMMM") +
  " " +
  format(currentDate, "YYYY") +
  ": " +
  format(startOfWeek(currentDate), "MM/DD") +
  " - " +
  format(endOfWeek(currentDate), "MM/DD");
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: initialShifts(),
      schedule: [],
      items: [],
      hours: [],
    };
    this.currentDate = new Date();
    this.deselectCell = <div class="deselectCell"></div>;
    this.selectCell = <div class="selectCell"></div>;
    this.renderCustomDateCell = this.renderCustomDateCell.bind(this);
    this.processData = this.processData.bind(this);
  }
  componentDidMount() {
    fetch("/availability/" + this.props.match.params.userId)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({ schedule: jsonResponse.schedule });
      });
    fetch("/allemployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({
          items: jsonResponse.items,
        });
        console.log(this.state.items);
        let newItems;
        for (let i = 0; i < this.state.items.length; i++) {
          if (this.state.items[i].id == this.props.match.params.userId) {
            newItems = this.state.items[i];
          }
        }
        this.setState({
          items: newItems,
        });
      });
  }
  // fetch("/staticcalendar/" + this.props.userId, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     items: this.state.shifts,
  //     userId: this.props.userId,
  //   }),
  // })
  //   .then((response) => {
  //     console.log("response");
  //     return response.json();
  //   })
  //   .then((jsonResponse) => {
  //     console.log(jsonResponse.shifts);
  //     this.setState({ shifts: jsonResponse.shifts });
  //   });
  //}
  processData(database) {
    console.log("Debugger: ");
    console.log(database);
    let m3L = database.training_level_moffitt3;
    let m4L = database.training_level_moffitt4;
    let dL = database.training_level_doe;
    let cm3;
    let cm4;
    let cd;
    if (m3L == 0) {
      cm3 = "trainingLevelsNoMoffittThird";
    } else {
      cm3 = "trainingLevelsMoffittThird";
    }
    if (m4L == 0) {
      cm4 = "trainingLevelsNoMoffittFourth";
    } else {
      cm4 = "trainingLevelsMoffittFourth";
    }
    if (cd == 0) {
      cd = "trainingLevelsNoDoe";
    } else {
      cd = "trainingLevelsDoe";
    }
    if (m3L == 1) {
      m3L = <img src={starImage} />;
    } else if (m3L == 2) {
      m3L = [<img src={starImage} />, <img src={starImage} />];
    } else if (m3L == 3) {
      m3L = [
        <img src={starImage} />,
        <img src={starImage} />,
        <img src={starImage} />,
      ];
    }
    if (m4L == 1) {
      m4L = <img src={starImage} />;
    } else if (m4L == 2) {
      m4L = [<img src={starImage} />, <img src={starImage} />];
    } else if (m4L == 4) {
      m4L = [
        <img src={starImage} />,
        <img src={starImage} />,
        <img src={starImage} />,
      ];
    }
    if (dL == 1) {
      dL = <img src={starImage} />;
    } else if (dL == 2) {
      dL = [<img src={starImage} />, <img src={starImage} />];
    } else if (dL == 3) {
      dL = [
        <img src={starImage} />,
        <img src={starImage} />,
        <img src={starImage} />,
      ];
    }
    return (
      <DisplayLibs
        moffitt3TrainingLevel={m3L}
        moffitt4TrainingLevel={m4L}
        doeTrainingLevel={dL}
        currentDisplayMoffitt3={cm3}
        currentDisplayMoffitt4={cm4}
        currentDisplayDoe={cd}
      />
    );
  }
  renderCustomDateCell = (time, selected, innerRef) => {
    return (
      <div style={{ textAlign: "center" }} ref={innerRef}>
        {selected ? this.selectCell : this.deselectCell}
      </div>
    );
  };

  render() {
    let timeslots = [];
    const hours = [
      "12am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
    ];

    /*Every 8th element should be an "item-hours" header,
      while every 1-7th element should be a shift cell.
    */
    for (var i = 0, ti = 0; i < 192; i += 1) {
      if (i % 8 == 0) {
        timeslots.push(<div className="item-hours">{hours[i / 8]}</div>);
      } else {
        timeslots.push(
          <Timeslot
            color={this.state.shifts[ti].color}
            id={this.state.shifts[ti].id}
            onClick={this.stateFixer}
          />
        );
        ti += 1;
      }
    }

    let wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div className="item-wday">
          {format(addDays(startOfWeek(currentDate), i), "dd MM/DD")}
        </div>
      );
    }

    const customStyles = {
      content: {
        top: "400px",
        left: "50%",
        width: "450px",
        height: "400px",
        transform: "translate(-50%, -50%)",
        overflow: 0,
      },
    };

    return (
      <div>
        <div>
          <div className="everything">
            <div className="myProfile">
              <h1 className="myProfileText">My Profile</h1>
            </div>
            <div className="profileBox">
              <div className="myProfileContainer">
                <div className="profilePictureContainer">
                  <div className="profilePicture"></div>
                </div>
                <div className="nameAndEmail">
                  <div className="nameText">{this.state.items.name}</div>
                  <div className="emailText">{this.state.items.email}</div>
                </div>
                <div className="trainingLevels">
                  <h1 className="trainingLevelsText">Training Levels</h1>
                </div>
                {this.processData(this.state.items)}
              </div>
            </div>
            <div className="stats">
              <h1 className="statsText">Stats</h1>
            </div>
            <div className="statsBox">
              <div className="firstStat">
                <div className="firstStatNumber">12</div>
                <div className="firstStatDesc">scheduled hours per week</div>
              </div>
              <div className="secondStat">
                <div className="secondStatNumber">80</div>
                <div className="firstStatDesc">total hours worked</div>
              </div>
              <div className="thirdStat">
                <div className="thirdStatNumber">4</div>
                <div className="firstStatDesc">
                  shifts requested to be covered
                </div>
              </div>
            </div>
            <div className="scheduledShifts">
              <div className="scheduledShiftsText">Scheduled Shifts</div>
            </div>
          </div>
          <div id="profile-schedule-container-st">
            <div id="frontWords">
              <h1 id="weekString">{weekString}</h1>
            </div>
            <div id="legend">
              <div id="libtag">
                <h3 id="findingspace">Moffitt 3rd&nbsp;</h3>
                <div id="moffitt3color"></div>
                <h3 id="findingspace">&nbsp;&nbsp;Moffitt 4th&nbsp;</h3>
                <div id="moffitt4color"></div>
              </div>
              <div id="libtag">
                <h3 id="findingspace">&nbsp;&nbsp;Doe&nbsp;</h3>
                <div id="doecolorStatic"></div>
                <h3 id="findingspace">&nbsp;&nbsp;Cover Requested&nbsp;</h3>
                <div id="coverrequestedcolor"></div>
              </div>
            </div>
            <div id="inner-schedule">
              <div></div>

              {wkdays}

              {timeslots}
            </div>
          </div>
        </div>
        <div id="overall-container">
          <div className="availabilityHeader">
            <div className="availabilitiesText">Availabilities</div>
          </div>
          <div className="invisible"></div>

          <div
            className="availabilitiesInvisible"
            id="profile-schedule-container"
          >
            <h1 id="weekString">{weekString}</h1>
            <ScheduleSelector
              startDate={startOfWeek(this.currentDate)}
              selection={this.state.schedule}
              numDays={7}
              minTime={0}
              maxTime={23}
              dateFormat="dd MM/DD"
              renderDateCell={this.renderCustomDateCell}
            />
          </div>
        </div>
      </div>
    );
  }
}
