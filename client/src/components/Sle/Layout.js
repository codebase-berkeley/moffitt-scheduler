import React from "react";
import { Redirect } from "react-router-dom";

function SidebarElement(props) {
  return (
    <div className="SidebarElement">
      <a className="title" href={props.link}>
        {props.title}
      </a>
    </div>
  );
}

function Sidebar(props) {
  return (
    <div class="sidebar">
      <SidebarElement title="Your Shifts" link="/yourshifts" />
      <SidebarElement title="Open Shifts" link="/openshifts" />
      <SidebarElement title="Availability" link="/availability" />
    </div>
  );
}

export default class Layout extends React.Component {
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
            </div>
          </div>
        </div>
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}
