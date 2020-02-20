import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Calendar from './components/Calendar/Calendar';

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/calendar" component={Calendar}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;