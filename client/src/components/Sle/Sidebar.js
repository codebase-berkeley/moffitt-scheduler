import React from "react";
import "./Sidebar.css";

function SidebarElement(props) {
  return (
    <div className="SidebarElement">
      <a className="title" href={props.link}>
        {props.title}
      </a>
    </div>
  );
}

export default function Sidebar(props) {
  return (
    <div class="sidebar">
      <SidebarElement title="Your Shifts" link="/yourshifts" />
      <SidebarElement title="Open Shifts" link="/openshifts" />
      <SidebarElement title="Availability" link="/availability" />
    </div>
  );
}
