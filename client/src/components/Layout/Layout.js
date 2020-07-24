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

function SleSidebar(props) {
  return (
    <div className="sidebar">
      <SidebarElement key={0} title="Your Shifts" link="/yourshifts" />
      <SidebarElement key={1} title="Open Shifts" link="/openshifts" />
      <SidebarElement key={2} title="Availability" link="/availability" />
      <SidebarElement key={3} title="Profile" link="/sleprofile" />
    </div>
  );
}

function SupervisorSidebar(props) {
  return (
    <div className="sidebar">
      <SidebarElement key={0} title="Employees" link="/employees" />
      <SidebarElement key={1} title="Cover Requests" link="/cover" />
      <SidebarElement key={2} title="Master Schedule" link="/masterschedule" />
      <SidebarElement key={4} title="Schedule Builder" link="/schedule" />
      <SidebarElement key={3} title="Profile" link="/supprofile" />
    </div>
  );
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    fetch("/api/logout", {
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
    var sidebar = null;
    if (this.props.sle) {
      sidebar = <SleSidebar />;
    } else {
      sidebar = <SupervisorSidebar />;
    }

    return (
      <div className="layout">
        {this.state.redirect}
        <div className="top-bar">
          <button className="logout" id="logout" onClick={this.logOut}>
            Log Out
          </button>
        </div>
        <div className="main">
          {sidebar}
          <div className="content">
            <h1 className="title">{this.props.title}</h1>
            <div className="center-content">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

function SleLayout(props) {
  return (
    <Layout sle={true} title={props.title}>
      {props.children}
    </Layout>
  );
}

function SupervisorLayout(props) {
  return (
    <Layout sle={false} title={props.title}>
      {props.children}
    </Layout>
  );
}

export { SleLayout, SupervisorLayout };
