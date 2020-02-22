import React from "react";
import "./Calendar.css"

class Timeslot extends React.Component {
    constructor(props) {
        super(props);   
        this.myRef = React.createRef();
      }
      render() {
        return <div ref={this.myRef} />;
      }
}

export default class Calendar extends React.Component {
  render() {
    return (
      <div id="calendar-container">
        <ul class="weekdays">
            <li>Sunday</li>
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
            <li>Saturday</li>
        </ul>
        <div class="hours">
            <li>12:00AM</li>
            <li>12:30AM</li>
            <li>1:00AM</li>
            <li>1:30AM</li>
            <li>1:00AM</li>
            <li>2:30AM</li>
            <li>3:00AM</li>
            <li>3:30AM</li>
            <li>4:00AM</li>
            <li>4:30AM</li>
            <li>5:00AM</li>
            <li>5:30AM</li>
            <li>6:00AM</li>
            <li>6:30AM</li>
            <li>7:00AM</li>
            <li>7:30AM</li>
            <li>8:00AM</li>
            <li>8:30AM</li>
            <li>9:00AM</li>
            <li>9:30AM</li>
            <li>10:00AM</li>
            <li>10:30AM</li>
            <li>11:00AM</li>
            <li>11:30AM</li>
            <li>12:00PM</li>
            <li>12:30PM</li>
            <li>1:00PM</li>
            <li>1:30PM</li>
            <li>2:00PM</li>
            <li>2:30PM</li>
            <li>3:00PM</li>
            <li>3:30PM</li>
            <li>4:00PM</li>
            <li>4:30PM</li>
            <li>5:00PM</li>
            <li>5:30PM</li>
            <li>6:00PM</li>
            <li>6:30PM</li>
            <li>7:00PM</li>
            <li>7:30PM</li>
            <li>8:00PM</li>
            <li>8:30PM</li>
            <li>9:00PM</li>
            <li>9:30PM</li>
            <li>10:00PM</li>
            <li>10:30PM</li>
            <li>11:00PM</li>
            <li>11:30PM</li>
            <li>12:00AM</li>
        </div>
        <div class="day-grid-container">
            <div class="day-grid-item">
               <Timeslot/>
            </div>
            <div class="day-grid-item"></div>
            <div class="day-grid-item"></div>
            <div class="day-grid-item"></div>
            <div class="day-grid-item"></div>
            <div class="day-grid-item"></div>
            <div class="day-grid-item"></div>
        </div>
      </div>
    );
  }
}