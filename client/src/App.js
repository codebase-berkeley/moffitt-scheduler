import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
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
          <Route exact path="/Sle" component={Sle} />
          <Route exact path="/Supervisor" component={Supervisor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
