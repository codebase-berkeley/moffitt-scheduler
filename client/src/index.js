import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from "./components/Calendar/Calendar";

function App() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }

ReactDOM.render(
    <App />, 
document.getElementById("root"));
