import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

<<<<<<< HEAD
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Calendar from './components/Calendar/Calendar';
import StaticCalendar from './components/Calendar/StaticCalendar';

import './App.css'
=======
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Calendar from "./components/Calendar/Calendar";
import "./App.css";
>>>>>>> c5c6759599a2a54d947b0fbdb416cf7704f3521a

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
<<<<<<< HEAD
          <Route exact path="/staticCalendar" component={StaticCalendar} />
=======
>>>>>>> c5c6759599a2a54d947b0fbdb416cf7704f3521a
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
