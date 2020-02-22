import React from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div className="Sidebar">
        <p className="title">{props.title}</p>
    </div>
    
  );
}