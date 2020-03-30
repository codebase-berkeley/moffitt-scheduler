import React from "react";
import "./Cover.css";
import PendingCoverage from "./PendingCoverage/PendingCoverage";
import PendingSupervisor from "./PendingSupervisor/PendingSupervisor";
import RequestHistory from "./RequestHistory/RequestHistory";

export default class Cover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}],
      typeOfPending: "supervisor approval" // coverage, supervisor approval, history
    };
    this.showPendingCoverage = this.showPendingCoverage.bind(this);
    this.showSupervisorApproval = this.showSupervisorApproval.bind(this);
    this.showHistory = this.showHistory.bind(this);
  }

  showPendingCoverage() {
    this.setState({ typeOfPending: "coverage" });
  }

  showSupervisorApproval() {
    this.setState({ typeOfPending: "supervisor approval" });
  }

  showHistory() {
    this.setState({ typeOfPending: "history" });
  }

  render() {
    let typeOfPending = this.state.typeOfPending;
    let pending;
    if (typeOfPending == "supervisor approval") {
      pending = <PendingSupervisor />;
    } else if (typeOfPending == "coverage") {
      pending = <PendingCoverage />;
    } else if (typeOfPending == "history") {
      pending = <RequestHistory />;
    } else {
      pending = null;
    }

    return (
      <div>
        <div className="topWords">
          <button
            autoFocus
            className="button"
            onClick={this.showPendingCoverage}
          >
            <h1> Pending Coverage</h1>;
          </button>
          <button className="button" onClick={this.showSupervisorApproval}>
            <h1> Pending Supervisor Approval</h1>
          </button>
          <button className="button" onClick={this.showHistory}>
            <h1> Request History</h1>
          </button>
        </div>
        {pending}
      </div>
    );
  }
}
