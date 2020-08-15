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

export { CoverHeader };
