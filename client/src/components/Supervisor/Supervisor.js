import React from "react";
import "./Supervisor.css";
import "./SidebarElement.css";
import "./SidebarElement.js";
import SidebarElement from "./SidebarElement";

function Supervisor(props) {
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
        <SidebarElement title="Schedule" />
        <SidebarElement title="Cover Requests" link="/cover" />
        <SidebarElement title="Employees" link="/employees" />
        <SidebarElement title="Schedule Requests" />
      </div>
    </div>
  );
}

export default Supervisor;
