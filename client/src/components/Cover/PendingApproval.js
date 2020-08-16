import React from "react";
import { CoverHeader } from "./CoverUtils";
import { longDate, timeToString, locToString } from "../../utils";

import "./Cover.css";

class PendingApproval extends React.Component {
  constructor(props) {
    super(props);

    this.state = { requests: [] };

    this.decisionClick = this.decisionClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/pendingapproval")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ requests: json.requests });
      });
  }

  decisionClick(shift_id, decision) {
    fetch("/api/coverdecision", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shift_id: shift_id, decision: decision })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.successful) {
          var newRequests = [];
          for (let i = 0; i < this.state.requests.length; i++) {
            if (this.state.requests[i].shift_id !== shift_id) {
              newRequests.push(this.state.requests[i]);
            }
          }

          this.setState({ requests: newRequests });
        }
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
          coverer={r.coverer}
          coveree={r.coveree}
          reason={r.reason}
          shiftid={r.shift_id}
          dc={this.decisionClick}
          key={i}
        />
      );
    }

    return (
      <div>
        <CoverHeader tab="pendingapproval" />
        <div className="requests">{requests}</div>
      </div>
    );
  }
}

function CoverRequest(props) {
  return (
    <div className="cover-request pending-approval">
      <div className="info">
        <h1>
          {longDate(new Date(props.date))} @ {timeToString(props.time)}
        </h1>
        <h2>Location: {locToString(props.location)}</h2>
        <h3>Covering Employee: {props.coverer}</h3>
        <h3>Scheduled Employee: {props.coveree}</h3>
        <p>Reason: {props.reason}</p>
      </div>
      <div className="pending-buttons">
        <button
          onClick={() => props.dc(props.shiftid, "approved")}
          className="approve"
        >
          Approve
        </button>{" "}
        <br />
        <button
          onClick={() => props.dc(props.shiftid, "denied")}
          className="deny"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

export default PendingApproval;
