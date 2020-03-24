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
      items: [{}],
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
      for (let j = 0; j < 24; j++) {
        this.state.allDaysOfWeek[i].push(<Box />);
      }
    }
  }
  componentDidMount() {
    fetch("/masterschedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.setState({
          items: jsonResponse.items
        });
        let newAllDaysOfWeek = this.state.allDaysOfWeek;
        for (let i = 0; i < this.state.items.length; i++) {
          let location = this.state.items[i]["location"];
          if (location == "Moffitt") {
            let name = this.state.items[i]["name"];
            let start_time = new Date(this.state.items[i]["start_time"]);
            let end_time = new Date(this.state.items[i]["end_time"]);
            let start_time_date = start_time.getDay();
            let end_time_date = start_time.getDay();
            let start_hour = start_time.getHours();
            let end_hour = end_time.getHours();
            if (start_time_date == end_time_date) {
              //If shifts runs across the same day
              for (let i = start_hour; i < end_hour; i++) {
                newAllDaysOfWeek[start_time_date][i] = <Box text={name} />;
              }
            } else {
              //In case days are not the same (i.e. Sunday-Monday shift)
              for (let i = start_hour; i < 24; i++) {
                newAllDaysOfWeek[start_time_date][i] = <Box text={name} />;
              }
              for (let i = 0; i < end_hour; i++) {
                newAllDaysOfWeek[end_time_date][i] = <Box text={name} />;
              }
            }
          }
        }
        this.setState({ allDaysOfWeek: newAllDaysOfWeek });
      });
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
