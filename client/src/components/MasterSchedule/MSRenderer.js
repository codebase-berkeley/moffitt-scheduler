import React from "react";
import "./MSRenderer.css";
import Library from "./Library";
import leftArrow from "./MasterImages/leftarrow.svg";
import rightArrow from "./MasterImages/rightarrow.svg";
import { format, startOfWeek, addDays } from "date-fns";

function dateObject(day, hour) {
  var dateObject = new Date();
  dateObject.setHours(hour, 0, 0, 0);
  var dayOfWeek = dateObject.getDay();
  var diff = dayOfWeek - day;
  var newDate = dateObject.getDate() - diff;
  dateObject.setDate(newDate);
  return dateObject;
}

function displayMonth(m) {
  const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return month[m];
}

export default class MSRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfLibrary: "Moffitt3",
      currentWeek: dateObject(0, 0),
    };
    this.showMoffitt = this.showMoffitt.bind(this);
    this.showMoffitt4 = this.showMoffitt4.bind(this);
    this.showDoe = this.showDoe.bind(this);

    this.previousWeek = this.previousWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  showMoffitt() {
    this.setState({ typeOfLibrary: "Moffitt3" });
  }

  showMoffitt4() {
    this.setState({ typeOfLibrary: "Moffitt4" });
  }

  showDoe() {
    this.setState({ typeOfLibrary: "Doe" });
  }

  previousWeek() {
    let currStartDate = new Date(this.state.currentWeek);
    currStartDate.setDate(currStartDate.getDate() - 7);
    this.setState({ currentWeek: currStartDate });
  }

  nextWeek() {
    let currStartDate = new Date(this.state.currentWeek);
    currStartDate.setDate(currStartDate.getDate() + 7);
    this.setState({ currentWeek: currStartDate });
  }

  generate() {
    fetch("/generatesched", {
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
        console.log(jsonResponse.items);
      });
  }

  confirm() {
    var startDateText = document.getElementById("startDate").value;
    console.log(startDateText);
    var endDateText = document.getElementById("endDate").value;
    console.log(endDateText);
    fetch("/generateshifts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate: startDateText, endDate: endDateText }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });
  }

  render() {
    let typeOfLibrary = this.state.typeOfLibrary;
    let pending;
    let moffitt3;
    let moffitt4;
    let doe;
    if (typeOfLibrary === "Moffitt3") {
      pending = (
        <Library currWeek={this.state.currentWeek} location={typeOfLibrary} />
      );
      moffitt3 = "clickedButton";
      moffitt4 = "nonClickedButton";
      doe = "nonClickedButton";
    } else if (typeOfLibrary === "Moffitt4") {
      pending = (
        <Library currWeek={this.state.currentWeek} location={typeOfLibrary} />
      );
      moffitt3 = "nonClickedButton";
      moffitt4 = "clickedButton";
      doe = "nonClickedButton";
    } else if (typeOfLibrary === "Doe") {
      pending = (
        <Library currWeek={this.state.currentWeek} location={typeOfLibrary} />
      );
      moffitt3 = "nonClickedButton";
      moffitt4 = "nonClickedButton";
      doe = "clickedButton";
    } else {
      pending = null;
    }

    const wkdays = [];
    for (var i = 0; i < 7; i += 1) {
      wkdays.push(
        <div class="item-wday2">
          {format(addDays(startOfWeek(this.state.currentWeek), i), "dd MM/DD")}
        </div>
      );
    }

    let startMonth = this.state.currentWeek.getMonth() + 1;
    let startDate = this.state.currentWeek.getDate();

    let endDate = new Date(this.state.currentWeek);
    endDate.setDate(endDate.getDate() + 7);

    let endDateNum = endDate.getDate() - 1;
    let endDateMonth = endDate.getMonth() + 1;

    let year = this.state.currentWeek.getFullYear();

    return (
      <div className="everythingMS">
        <div classname="masterScheduleAndButtons">
          <div className="masterScheduleText">Master Schedule</div>
          <div className="secondRow">
            <div className="rightButtons">
              <button className={moffitt3} onClick={this.showMoffitt}>
                <h1>Moffitt 3rd</h1>
              </button>
              <button className={moffitt4} onClick={this.showMoffitt4}>
                <h1>Moffitt 4th</h1>
              </button>
              <button className={doe} onClick={this.showDoe}>
                <h1>Doe</h1>
              </button>
            </div>
            <div className="MSarrows">
              <button className="buttonLeftArrow">
                <img
                  className="leftArrow"
                  onClick={this.previousWeek}
                  src={leftArrow}
                  alt="leftArrow"
                />
              </button>
              <div className="currWeekContainer">
                <div className="currWeek">
                  {displayMonth(startMonth)} {year}: {startMonth}/{startDate} -{" "}
                  {endDateMonth}/{endDateNum}
                </div>
              </div>
              <button className="buttonRightArrow">
                <img
                  className="rightArrow"
                  onClick={this.nextWeek}
                  src={rightArrow}
                  alt="rightArrow"
                />
              </button>
            </div>
            <div className="form">
              <div className="formdiv">
                <form action="/action_page.php">
                  <label for="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    className="startDate"
                    placeholder="Start Date"
                    defaultValue="2020-05-07"
                  ></input>
                  <label for="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    className="endDate"
                    placeholder="End Date"
                    defaultValue="2020-05-08"
                  ></input>
                </form>
              </div>
              <div className="leftButtons">
                <button className="schedGenerator" onClick={this.generate}>
                  <h1>Generate</h1>
                </button>
                <button className="confirmButton" onClick={this.confirm}>
                  <h1>Confirm</h1>
                </button>
              </div>
            </div>
          </div>
          <div className="weekdayBox">
            <div className="weekdayText">{wkdays}</div>
          </div>
        </div>

        <div className="MSCalendar">
          <div className="boxesAndDates">
            <div className="hours">
              <div className="hour">12 AM</div>
              <div className="hour">1 AM</div>
              <div className="hour">2 AM</div>
              <div className="hour">3 AM</div>
              <div className="hour">4 AM</div>
              <div className="hour">5 AM</div>
              <div className="hour">6 AM</div>
              <div className="hour">7 AM</div>
              <div className="hour">8 AM</div>
              <div className="hour">9 AM</div>
              <div className="hour">10 AM</div>
              <div className="hour">11 AM</div>
              <div className="hour">12 PM</div>
              <div className="hour">1 PM</div>
              <div className="hour">2 PM</div>
              <div className="hour">3 PM</div>
              <div className="hour">4 PM</div>
              <div className="hour">5 PM</div>
              <div className="hour">6 PM</div>
              <div className="hour">7 PM</div>
              <div className="hour">8 PM</div>
              <div className="hour">9 PM</div>
              <div className="hour">10 PM</div>
              <div className="hour">11 PM</div>
            </div>
            {pending}
          </div>
        </div>
      </div>
    );
  }
}
