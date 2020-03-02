import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Calendar from "./components/Calendar/Calendar";
import StaticCalendar from "./components/Calendar/StaticCalendar";
import Employees from "./components/Employees/Employees";
import Cover from "./components/Cover/Cover";
import PendingSupervisor from "./components/Cover/PendingSupervisor/PendingSupervisor";
import RequestHistory from "./components/Cover/RequestHistory/RequestHistory";
import Sle from "./components/Sle/Sle";
import Supervisor from "./components/Supervisor/Supervisor";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/staticCalendar" component={StaticCalendar} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/cover" component={Cover} />
          <Route
            exact
            path="/cover/pendingsupervisor"
            component={PendingSupervisor}
          />
          <Route
            exact
            path="/cover/requesthistory"
            component={RequestHistory}
          />
          <Route exact path="/Sle" component={Sle} />
          <Route exact path="/Supervisor" component={Supervisor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
