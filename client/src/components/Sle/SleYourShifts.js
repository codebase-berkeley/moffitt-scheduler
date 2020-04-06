import React from "react";
import "./SleYourShifts.css";
import "./SidebarElement.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";
import StaticCalendar from "../Calendar/StaticCalendar.js";

export default class SleShifts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var shiftsLink = "/yourshifts/" + this.props.match.params.userId;
    var availabilityLink = "/availability/" + this.props.match.params.userId;
    var openshiftsLink = "/openshifts/" + this.props.match.params.userId;

    return (
      <div class="everything">
        <div class="line"></div>
        <div className="top-bar">
          <div class="user-box">
            <div class="user-id">
              <div class="user-name">
                <a href="/login">Log Out</a>
              </div>
              {/* <div class="dropdown-arrow"></div>
              <div class="dropdown-menu">
                <ul>
                  <li>View Profile</li>
                  <a href="/login">
                    <li>Log Out </li>
                  </a>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div class="sidebar">
          <SidebarElement title="Your Shifts" link={shiftsLink} />
          <SidebarElement title="Open Shifts" link={openshiftsLink} />
          <SidebarElement title="Availability" link={availabilityLink} />
        </div>
        <div class="StaticCalendar">
          <StaticCalendar userId={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}
