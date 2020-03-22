import React from "react";
import "./Moffitt.css";

export default function Moffitt(props) {
  var [
    sundayArray,
    mondayArray,
    tuesdayArray,
    wednesdayArray,
    thursdayArray,
    fridayArray,
    saturdayArray
  ] = [[], [], [], [], [], [], []];
  var allDaysOfWeek = [
    sundayArray,
    mondayArray,
    tuesdayArray,
    wednesdayArray,
    thursdayArray,
    fridayArray,
    saturdayArray
  ];
  for (var i = 0; i < 6; i++) {
    allDaysOfWeek[0].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[1].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[2].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[3].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[4].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[5].push(<Box text="Sahil Thakur" />);
    allDaysOfWeek[6].push(<Box text="Sahil Thakur" />);
  }
  return (
    <div className="weekdayColumns">
      <div className="sundayColumn">{sundayArray}</div>
      <div className="mondayColumn">{mondayArray}</div>
      <div className="tuesdayColumn">{tuesdayArray}</div>
      <div className="wednesdayColumn">{wednesdayArray}</div>
      <div className="thursdayColumn">{thursdayArray}</div>
      <div className="fridayColumn">{fridayArray}</div>
      <div className="saturdayColumn">{saturdayArray}</div>
    </div>
  );
}

function Box(props) {
  return <div className="box">{props.text}</div>;
}
