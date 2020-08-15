import React from "react";
import { CoverHeader } from "./CoverUtils";
import { longDate, timeToString, locToString } from "../../utils";

import "./Cover.css";

class PendingCoverage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    fetch("/api/pendingcoverage")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ requests: json.requests });
      });
  }

  render() {
    var requests = [];
    for (let i = 0; i < this.state.requests.length; i++) {
      let r = this.state.requests[i];
      requests.push(
        <CoverRequest
          date={r.date}
          time={r.time}
          location={r.location}
          employee={r.employee}
          reason={r.reason}
          key={i}
        />
      );
    }

    return (
      <div>
        <CoverHeader tab="pendingcoverage" />
        <div className="requests">{requests}</div>
      </div>
    );
  }
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
        {longDate(new Date(props.date))} @ {timeToString(props.time)}
      </h1>
      <h2>Location: {locToString(props.location)}</h2>
      <h3>Scheduled Employee: {props.employee}</h3>
      <p>Reason: {props.reason}</p>
    </div>
  );
}

export default PendingCoverage;
