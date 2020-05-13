import React from "react";
import "./SupervisorCover.css";
import "./SidebarElement.css";
import "./SupervisorMS.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";
import MSRenderer from "../MasterSchedule/MSRenderer";

export default function SupervisorMS(props) {
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
                  <li>Log Out</li>
                </a>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div class="sidebar">
        <SidebarElement title="Schedule" link="/masterschedule" />
        <SidebarElement title="Cover Requests" link="/cover" />
        <SidebarElement title="Employees" link="/employees" />
        <SidebarElement title="Schedule Requests" />
      </div>
      <div class="coverz">
        <MSRenderer />
      </div>
    </div>
  );
}
