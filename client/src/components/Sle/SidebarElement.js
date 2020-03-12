import React from "react";
import "./SidebarElement.css";

export default function SidebarElement(props) {
  return (
    <div className="SidebarElement">
      <a className="title" href={props.link}>
        {props.title}
      </a>
    </div>
  );
}
