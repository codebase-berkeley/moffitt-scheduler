import React from "react";
import "./EachEmployee.css";

export default function EachEmployee(props) {
  return (
    <div className="someEmployee">
      <div className="pleaseWork">
        <div class="holder"></div>
        <div className="vertical">
          <h2 className="name">{props.name}</h2>
          <h3 className="email">{props.email}</h3>
        </div>
      </div>
      <div className="lib">
        <div className="first">{props.firstLibrary}</div>
        <div className="second">{props.secondLibrary}</div>
      </div>
    </div>
  );
}
