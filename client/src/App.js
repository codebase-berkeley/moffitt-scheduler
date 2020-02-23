import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Employees from './components/Employees/Employees';
import Announcement from './components/Announcement/Announcement';
import Cover from './components/Cover/Cover';
import PendingSupervisor from './components/Cover/PendingSupervisor/PendingSupervisor';
import RequestHistory from './components/Cover/RequestHistory/RequestHistory';


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
          <Route exact path="/cover" component={Cover} />
          <Route exact path="/cover/pendingsupervisor" component={PendingSupervisor} />
          <Route exact path="/cover/requesthistory" component={RequestHistory} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;