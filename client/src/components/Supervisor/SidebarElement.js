import React from "react";
import "./SidebarElement.css";

export default function SidebarElement(props) {
  return (
    <div className="SidebarElement">
      <p className="title">{props.title}</p>
    </div>
  );
}
