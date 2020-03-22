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
    if (typeOfLibrary == "moffitt") {
      pending = <Moffitt />;
    } else if (typeOfLibrary == "doe") {
      pending = <Doe />;
    } else {
      pending = null;
    }
    return (
      <div>
        <div classname="masterScheduleAndButtons">
          <div className="masterScheduleText">Master Schedule</div>
          <div className="buttons">
            <button className="moffittButton" onClick={this.showMoffit}>
              <h1>Moffitt</h1>
            </button>
            <button className="doeButton" onClick={this.showDoe}>
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
        {pending}
        {/* <Box text="something" /> */}
      </div>
    );
  }
}

function Box(props) {
  return <div>{props.text}</div>;
}
