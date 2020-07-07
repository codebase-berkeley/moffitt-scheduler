import React from "react";
import { Redirect } from "react-router-dom";

import "./Layout.css";

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
  var elements = [];
  for (var i = 0; i < props.titles.length; i++) {
    elements.push(
      <SidebarElement key={i} title={props.titles[i]} link={props.links[i]} />
    );
  }
  return <div class="sidebar">{elements}</div>;
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    console.log("In logout function");
    fetch("http://localhost:8000/logout", {
      credentials: "include"
    })
      .then(response => {
        console.log("response", response);
        return response.json();
      })
      .then(jsonResponse => {
        console.log("jsonResponse", jsonResponse);
        if (jsonResponse.logout === true) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        }
      });
  }
  render() {
    return (
      <div className="everything">
        {this.state.redirect}
        <div className="line"></div>
        <div className="top-bar">
          <div className="user-box">
            <div className="user-id">
              <div className="user-name" onClick={this.logOut}>
                Log Out
              </div>
            </div>
          </div>
        </div>
        <Sidebar titles={this.props.titles} links={this.props.links} />
        {this.props.children}
      </div>
    );
  }
}

var sleTitles = ["Your Shifts", "Open Shifts", "Availability"];
var sleLinks = ["/yourshifts", "/openshifts", "/availability"];

function SleLayout(props) {
  return (
    <Layout titles={sleTitles} links={sleLinks}>
      {props.children}
    </Layout>
  );
}

var supervisorTitles = ["Employees", "Cover Requests", "Master Schedule"];
var supervisorLinks = ["/employees", "/cover", "/masterschedule"];

function SupervisorLayout(props) {
  return (
    <Layout titles={supervisorTitles} links={supervisorLinks}>
      {props.children}
    </Layout>
  );
}

export { SleLayout, SupervisorLayout };
