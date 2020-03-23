import React from "react";
import "./Moffitt.css";

export default class Moffitt extends React.Component {
  constructor(props) {
    super(props);
    let [
      sundayArray,
      mondayArray,
      tuesdayArray,
      wednesdayArray,
      thursdayArray,
      fridayArray,
      saturdayArray
    ] = [[], [], [], [], [], [], []];
    this.state = {
      allDaysOfWeek: [
        sundayArray,
        mondayArray,
        tuesdayArray,
        wednesdayArray,
        thursdayArray,
        fridayArray,
        saturdayArray
      ]
    };
    for (let i = 0; i < this.state.allDaysOfWeek.length; i++) {
      for (let j = 0; j < 23; j++) {
        this.state.allDaysOfWeek[i].push(<Box text="Sahil Thakur" />);
      }
    }
    let newAllDaysOfWeek = this.state.allDaysOfWeek;
    newAllDaysOfWeek[0][0] = <Box text="Change Name Test" />;
    this.setState({ allDaysOfWeek: newAllDaysOfWeek });
  }
  render() {
    return (
      <div className="weekdayColumns">
        <div className="sundayColumn">{this.state.allDaysOfWeek[0]}</div>
        <div className="mondayColumn">{this.state.allDaysOfWeek[1]}</div>
        <div className="tuesdayColumn">{this.state.allDaysOfWeek[2]}</div>
        <div className="wednesdayColumn">{this.state.allDaysOfWeek[3]}</div>
        <div className="thursdayColumn">{this.state.allDaysOfWeek[4]}</div>
        <div className="fridayColumn">{this.state.allDaysOfWeek[5]}</div>
        <div className="saturdayColumn">{this.state.allDaysOfWeek[6]}</div>
      </div>
    );
  }
}

function Box(props) {
  return <div className="box">{props.text}</div>;
}
