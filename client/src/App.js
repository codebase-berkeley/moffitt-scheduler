import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SleAvailability from "./components/Sle/SleAvailability";
import SleYourShifts from "./components/Sle/SleYourShifts";
import SupervisorEmployees from "./components/Supervisor/SupervisorEmployees";
import SupervisorPendingCoverage from "./components/Supervisor/SupervisorPendingCoverage";
import SupervisorPendingApproval from "./components/Supervisor/SupervisorPendingApproval";
import SupervisorRequestHistory from "./components/Supervisor/SupervisorRequestHistory";
import MasterSchedule from "./components/Supervisor/SupervisorMS";
import SleProfile from "./components/Sle/SleProfile";
import SupProfile from "./components/Supervisor/SupervisorProfile";
import SupervisorSleProfile from "./components/Supervisor/SupervisorSleProfile";
import ScheduleBuilder from "./components/Supervisor/SupervisorBuilder";

import "./App.css";
import SleOpenShifts from "./components/Sle/SleOpenShifts";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/yourshifts" component={SleYourShifts} />
          <Route exact path="/availability" component={SleAvailability} />
          <Route exact path="/openshifts" component={SleOpenShifts} />
          <Route exact path="/employees" component={SupervisorEmployees} />
          <Route
            exact
            path="/pendingcoverage"
            component={SupervisorPendingCoverage}
          />
          <Route
            exact
            path="/pendingapproval"
            component={SupervisorPendingApproval}
          />
          <Route
            exact
            path="/requesthistory"
            component={SupervisorRequestHistory}
          />
          <Route exact path="/masterschedule" component={MasterSchedule} />
          <Route exact path="/sleprofile" component={SleProfile} />
          <Route exact path="/supprofile" component={SupProfile} />
          <Route
            exact
            path="/supsleprofile/:userId"
            component={SupervisorSleProfile}
          />
          <Route exact path="/builder" component={ScheduleBuilder} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
