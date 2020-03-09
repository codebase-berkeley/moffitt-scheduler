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
        <SidebarElement title="Cover Requests" />
        <SidebarElement title="Announcements" />
        <SidebarElement title="Employees" />
        <SidebarElement title="Schedule Requests" />
        <NavLink to="/cover" activeStyle={{ fontWeight: "bold" }}>
          Cover Requests
        </NavLink>
      </div>
    </div>
  );
}

export default Supervisor;
