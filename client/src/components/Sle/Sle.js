import React from "react";
import "./Sle.css";
import "./SidebarElement.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";

function Sle(props) {
  var shiftsLink = "/yourshifts/" + props.match.params.userId;
  var availabilityLink = "/availability/" + props.match.params.userId;

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
        <SidebarElement title="Your Shifts" link={shiftsLink} />
        <SidebarElement title="Open Shifts" />
        <SidebarElement title="Availability" link={availabilityLink} />
      </div>
    </div>
  );
}

export default Sle;
