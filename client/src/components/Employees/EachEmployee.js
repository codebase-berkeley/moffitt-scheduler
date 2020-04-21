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
        <div className={props.currentDisplayMoffitt3}>
          Moffitt 3 {props.moffitt3TrainingLevel}
        </div>
        <div className={props.currentDisplayMoffitt4}>
          Moffitt 4 {props.moffitt4TrainingLevel}
        </div>
        <div className={props.currentDisplayDoe}>
          Doe {props.doeTrainingLevel}
        </div>
      </div>
    </div>
  );
}
