import React from "react";
import "./Doe.css";

export default function Doe(props) {
  var array = [];
  for (var i = 0; i < 6; i++) {
    array.push(<Box text="Tetsu Escudero" />);
  }
  return (
    <div className="weekdayColumns">
      <div className="sundayColumn">{array}</div>
      <div className="mondayColumn">{array}</div>
      <div className="tuesdayColumn">{array}</div>
      <div className="wednesdayColumn">{array}</div>
      <div className="thursdayColumn">{array}</div>
      <div className="fridayColumn">{array}</div>
      <div className="saturdayColumn">{array}</div>
    </div>
  );
}

function Box(props) {
  return <div className="box">{props.text}</div>;
}
