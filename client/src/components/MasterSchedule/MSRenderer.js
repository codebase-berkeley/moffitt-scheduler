import React from "react";
import "./MSRenderer.css";
import Moffitt from "./Moffitt";
import Doe from "./Doe";

export default class MSRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfLibrary: "moffitt",
    };
    this.showMoffit = this.showMoffit.bind(this);
    this.showDoe = this.showDoe.bind(this);
    this.generate = this.generate.bind(this);
  }

  showMoffit() {
    this.setState({ typeOfLibrary: "moffitt" });
  }

  showDoe() {
    this.setState({ typeOfLibrary: "doe" });
  }

  generate() {
    fetch("/generatesched", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse.items);
      });
  }

  render() {
    let typeOfLibrary = this.state.typeOfLibrary;
    let pending;
    let clicked;
    let nonClicked;
    if (typeOfLibrary == "moffitt") {
      pending = <Moffitt />;
      clicked = "moffittButton";
      nonClicked = "doeButton";
    } else if (typeOfLibrary == "doe") {
      pending = <Doe />;
      clicked = "doeButton";
      nonClicked = "moffittButton";
    } else {
      pending = null;
    }
    return (
      <div className="everything">
        <div classname="masterScheduleAndButtons">
          <div className="masterScheduleText">Master Schedule</div>
          <div className="buttons">
            <button className="schedGenerator" onClick={this.generate}>
              <h1>Generate</h1>
            </button>
            <button className={clicked} onClick={this.showMoffit}>
              <h1>Moffitt</h1>
            </button>
            <button className={nonClicked} onClick={this.showDoe}>
              <h1>Doe</h1>
            </button>
          </div>
        </div>

        <div className="weekdayBox">
          <div className="weekdayText">
            <div className="sunday">Sunday</div>
            <div className="monday">Monday</div>
            <div className="tuesday">Tuesday</div>
            <div className="wednesday">Wednesday</div>
            <div className="thursday">Thursday</div>
            <div className="friday">Friday</div>
            <div className="saturday">Saturday</div>
          </div>
          {/* <Box text="something" /> */}
        </div>
        <div className="boxesAndDates">
          <div className="hours">
            <div className="hour">12 AM</div>
            <div className="hour">1 AM</div>
            <div className="hour">2 AM</div>
            <div className="hour">3 AM</div>
            <div className="hour">4 AM</div>
            <div className="hour">5 AM</div>
            <div className="hour">6 AM</div>
            <div className="hour">7 AM</div>
            <div className="hour">8 AM</div>
            <div className="hour">9 AM</div>
            <div className="hour">10 AM</div>
            <div className="hour">11 AM</div>
            <div className="hour">12 PM</div>
            <div className="hour">1 PM</div>
            <div className="hour">2 PM</div>
            <div className="hour">3 PM</div>
            <div className="hour">4 PM</div>
            <div className="hour">5 PM</div>
            <div className="hour">6 PM</div>
            <div className="hour">7 PM</div>
            <div className="hour">8 PM</div>
            <div className="hour">9 PM</div>
            <div className="hour">10 PM</div>
            <div className="hour">11 PM</div>
          </div>
          {pending}
        </div>
        {/* <Box text="something" /> */}
      </div>
    );
  }
}

function Box(props) {
  return <div>{props.text}</div>;
}
