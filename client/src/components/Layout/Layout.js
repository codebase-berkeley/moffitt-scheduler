import React from "react";
import "./Layout.css";

import { Redirect } from "react-router-dom";

function SidebarElement(props) {
  return (
    <div className="sidebar-element">
      <a href={props.link}>{props.title}</a>
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
      <div className="layout">
        {this.state.redirect}
        <div className="top-bar">
          <button className="logout" onClick={this.logOut}>
            Log Out
          </button>
        </div>
        <div className="main">
          <Sidebar titles={this.props.titles} links={this.props.links} />
          <div className="content">
            <h1 class="title">{this.props.title}</h1>
            <div class="center-content">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

var sleTitles = ["Your Shifts", "Open Shifts", "Availability"];
var sleLinks = ["/yourshifts", "/openshifts", "/availability"];

function SleLayout(props) {
  return (
    <Layout title={props.title} titles={sleTitles} links={sleLinks}>
      {props.children}
    </Layout>
  );
}

var supervisorTitles = ["Employees", "Cover Requests", "Master Schedule"];
var supervisorLinks = ["/employees", "/cover", "/masterschedule"];

function SupervisorLayout(props) {
  return (
    <Layout
      title={props.title}
      titles={supervisorTitles}
      links={supervisorLinks}
    >
      {props.children}
    </Layout>
  );
}

export { SleLayout, SupervisorLayout };
