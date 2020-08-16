import React from "react";
import { CoverHeader } from "./CoverUtils";
import { longDate, timeToString, locToString } from "../../utils";

import { Redirect } from "react-router-dom";

import "./Cover.css";

class RequestHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = { requests: [], redirect: null };
  }

  componentDidMount() {
    fetch("/api/requesthistory")
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.noAuth) {
          this.setState({ redirect: <Redirect to="/login" /> });
        }

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
          coverer={r.coverer}
          coveree={r.coveree}
          reason={r.reason}
          sup_status={r.sup_status}
          key={i}
        />
      );
    }

    return (
      <div>
        {this.state.redirect}
        <CoverHeader tab="requesthistory" />
        <div className="requests">{requests}</div>
      </div>
    );
  }
}

function CoverRequest(props) {
  var status = <div className="approved status">Approved</div>;
  if (props.sup_status === "denied") {
    status = <div className="denied status">Denied</div>;
  }

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
      <div className="status-cont">{status}</div>
    </div>
  );
}

export default RequestHistory;
