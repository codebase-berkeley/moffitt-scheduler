import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Announcement from './components/Announcement/Announcement';
import Employee from './components/Employee/Employee';
import Cover from './components/Cover/Cover';


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
          <Route exact path="/announcement" component={Announcement} />
          <Route exact path="/employees" component={Employee} />
          <Route exact path="/cover" component={Cover} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;