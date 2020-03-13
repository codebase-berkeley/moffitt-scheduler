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
        <div>
          <button onClick={this.showMoffit}>
            <h1>Moffitt</h1>
          </button>
          <button onClick={this.showDoe}>
            <h1>Doe</h1>
          </button>
        </div>
        <p className="msrenderer">
          Permanent Render stuff goes here --> master schedule text, Buttons,
          days of weeks
        </p>
        {pending}
      </div>
    );
  }
}
