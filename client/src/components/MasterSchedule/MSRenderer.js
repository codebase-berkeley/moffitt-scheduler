import React from "react";
import "./MSRenderer.css";
import Library from "./Library";


export default class MSRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfLibrary: "Moffitt3",
    };
    this.showMoffitt = this.showMoffitt.bind(this);
    this.showMoffitt4 = this.showMoffitt4.bind(this);
    this.showDoe = this.showDoe.bind(this);
  }

  showMoffitt() {
    this.setState({ typeOfLibrary: "Moffitt3" });
  }

  showMoffitt4() {
    this.setState({ typeOfLibrary: "Moffitt4" });
  }

  showDoe() {
    this.setState({ typeOfLibrary: "Doe" });
  }

  render() {
    let typeOfLibrary = this.state.typeOfLibrary;
    let pending;
    let moffitt3;
    let moffitt4;
    let doe;
    if (typeOfLibrary == "Moffitt3") {
      pending = <Library location={typeOfLibrary} />;
      moffitt3 = "clickedButton";
      moffitt4 = "nonClickedButton";
      doe = "nonClickedButton";
    } else if (typeOfLibrary == "Moffitt4") {
      pending = <Library location={typeOfLibrary} />;
      moffitt3 = "nonClickedButton";
      moffitt4 = "clickedButton";
      doe = "nonClickedButton";
    } else if (typeOfLibrary == "Doe") {
      pending = <Library location={typeOfLibrary} />;
      moffitt3 = "nonClickedButton";
      moffitt4 = "nonClickedButton";
      doe = "clickedButton";
    } else {
      pending = null;
    }

    return (
      <div className="everythingMS">
        <div classname="masterScheduleAndButtons">
          <div className="masterScheduleText">
            Master Schedule
          </div>
          <div className="buttons">
            <button className={moffitt3} onClick={this.showMoffitt}>
              <h1>Moffitt 3rd</h1>
            </button>
            <button className={moffitt4} onClick={this.showMoffitt4}>
              <h1>Moffitt 4th</h1>
            </button>
            <button className={doe} onClick={this.showDoe}>
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
      </div>
    );
  }
}
