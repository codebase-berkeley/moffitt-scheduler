import React from "react";
import "./SleAvailability.css";
import "./SidebarElement.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";
import Calendar from "../Calendar/Calendar.js";

export default class SleCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="everything">
        <div class="line"></div>
        <div className="top-bar">
          <div class="user-box">
            <div class="user-id">
              <div class="user-name">Bianca Lee</div>
              <div class="dropdown-arrow"></div>
              <div class="dropdown-menu">
                <ul>
                  <li>View Profile</li>
                  <a href="/login">
                    <li>Log Out </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar">
          <SidebarElement title="Your Shifts" link="/yourshifts" />
          <SidebarElement title="Open Shifts" />
          <SidebarElement title="Availability" link="/availability" />
        </div>
        <div class="Calendar">
          <Calendar userId={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}
