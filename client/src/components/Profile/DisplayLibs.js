import React from "react";
import "./Profile.css";

export default function DisplayLibs(props) {
  return (
    <div className="trainingLevelsContainer">
      <div className={props.currentDisplayMoffitt3}>
        <div className="moffittThirdText">
          Moffitt 3rd: {props.moffitt3TrainingLevel}
        </div>
      </div>
      <div className={props.currentDisplayMoffitt4}>
        <div className="moffittFourthText">
          Moffitt 4th: {props.moffitt4TrainingLevel}
        </div>
      </div>
      <div className={props.currentDisplayDoe}>
        <div className="doeText">Doe: {props.doeTrainingLevel}</div>
      </div>
    </div>
  );
}
/*
"trainingLevelsMoffittThird"
"trainingLevelsMoffittFourth"
"trainingLevelsDoe"
*/
