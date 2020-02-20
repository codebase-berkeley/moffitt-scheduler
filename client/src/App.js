import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Employees from './components/Employees/Employees';
import Announcement from './components/Announcement/Announcement';

import './App.css'

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
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/announcement" component={Announcement} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;