import React from "react";

import "./Cover.css";

function CoverHeader(props) {
  var pcC = "";
  var paC = "";
  var rhC = "";

  if (props.tab === "pendingcoverage") {
    pcC = "selected";
  } else if (props.tab === "pendingapproval") {
    paC = "selected";
  } else if (props.tab === "requesthistory") {
    rhC = "selected";
  } else {
    console.log("ERROR: invalid tab for cover requests");
  }
  return (
    <div className="cover-header">
      <a href="/pendingcoverage" className={pcC}>
        Pending Coverage
      </a>
      <a href="/pendingapproval" className={paC}>
        Pending Approval
      </a>
      <a href="/requesthistory" className={rhC}>
        Request History
      </a>
    </div>
  );
}

// Date
// Time
// Location
// Employee
// Reason
function CoverRequest(props) {
  return (
    <div className="cover-request">
      <h1>
        {props.date} @ {props.time}
      </h1>
      <h2>Location: {props.location}</h2>
      <h3>Scheduled Employee: {props.employee}</h3>
      <p>Reason: {props.reason}</p>
    </div>
  );
}

export { CoverHeader, CoverRequest };
