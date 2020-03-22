import React from "react";
import "./Moffitt.css";

export default function Moffitt(props) {
  var array = [];
  for (var i = 0; i < 6; i++) {
    array.push(<Box />);
  }
  return (
    <div className="weekdayColumns">
      <div className="sundayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="mondayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="tuesdayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="wednesdayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="thursdayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="fridayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
      <div className="saturdayColumn">
        {/* <p className="msmoffitt">This is the Moffitt page!</p> */}
        {/* <Box text="something" />) */}
        {array}
      </div>
    </div>
  );
}

function Box(props) {
  return <div className="box">{props.text}</div>;
}
