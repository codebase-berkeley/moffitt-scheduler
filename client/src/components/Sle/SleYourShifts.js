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
                  <li>Log Out</li>
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
        <div class="StaticCalendar">
          <StaticCalendar userId={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}

