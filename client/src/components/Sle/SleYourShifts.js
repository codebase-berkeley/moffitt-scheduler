import React from "react";
import "./SleYourShifts.css";
import Sidebar from "./Sidebar";
import StaticCalendar from "../Calendar/StaticCalendar.js";
import { Redirect } from "react-router-dom";

export default class SleShifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    fetch("/logout", {
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.logout === true) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        }
      });
  }
  render() {
    var shiftsLink = "/yourshifts";
    var availabilityLink = "/availability";
    var openshiftsLink = "/openshifts";

    return (
      <div class="everything">
        {this.state.redirect}
        <div class="line"></div>
        <div className="top-bar">
          <div class="user-box">
            <div class="user-id">
              <div class="user-name" onClick={this.logOut}>
                Log Out
              </div>
              {/* <div class="dropdown-arrow"></div>
              <div class="dropdown-menu">
                <ul>
                  <li>View Profile</li>
                  <a href="/login">
                    <li>Log Out </li>
                  </a>
                </ul>
              </div> */}
            </div>
          </div>
        </div>

        <Sidebar />

        <div class="StaticCalendar">
          <StaticCalendar userId={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}
