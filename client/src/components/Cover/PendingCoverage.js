import React from "react";
import { CoverHeader, CoverRequest } from "./CoverUtils";

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
        />
      );
    }

    return (
      <div>
        <CoverHeader tab="pendingcoverage" />
        {requests}
      </div>
    );
  }
}

export default PendingCoverage;
