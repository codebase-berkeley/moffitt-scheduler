import React from "react";
import "./MSRenderer.css";
import Moffitt from "./Moffitt";
import Doe from "./Doe";

export default class MSRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfLibrary: "moffitt"
    };
    this.showMoffit = this.showMoffit.bind(this);
    this.showDoe = this.showDoe.bind(this);
  }

  showMoffit() {
    this.setState({ typeOfLibrary: "moffitt" });
  }

  showDoe() {
    this.setState({ typeOfLibrary: "doe" });
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
            <div className="12am">12 AM</div>
            <div className="1am">1 AM</div>
            <div className="2am">2 AM</div>
            <div className="3am">3 AM</div>
            <div className="4am">4 AM</div>
            <div className="5am">5 AM</div>
            <div className="6am">6 AM</div>
            <div className="7am">7 AM</div>
            <div className="8am">8 AM</div>
            <div className="9am">9 AM</div>
            <div className="10am">10 AM</div>
            <div className="11am">11 AM</div>
            <div className="12pm">12 PM</div>
            <div className="1pm">1 PM</div>
            <div className="2pm">2 PM</div>
            <div className="3pm">3 PM</div>
            <div className="4pm">4 PM</div>
            <div className="5pm">5 PM</div>
            <div className="6pm">6 PM</div>
            <div className="7pm">7 PM</div>
            <div className="8pm">8 PM</div>
            <div className="9pm">9 PM</div>
            <div className="10pm">10 PM</div>
            <div className="11pm">11 PM</div>
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
