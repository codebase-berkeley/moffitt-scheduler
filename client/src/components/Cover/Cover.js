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
    console.log(this.state.typeOfPending);
  }

  showSupervisorApproval() {
    this.setState({ typeOfPending: "supervisor approval" });
  }

  showHistory() {
    this.setState({ typeOfPending: "history" });
    console.log(this.state.typeOfPending);
  }

  render() {
    let typeOfPending = this.state.typeOfPending;
    console.log(typeOfPending);
    let pending;
    if (typeOfPending == "supervisor approval") {
      pending = <PendingSupervisor />;
    } else if (typeOfPending == "coverage") {
      console.log("GOT HERE");
      pending = <PendingCoverage />;
    } else if (typeOfPending == "history") {
      pending = <RequestHistory />;
    } else {
      pending = null;
    }

    return (
      <div>
        <div className="topWords">
          <button onClick={this.showPendingCoverage}>
            <h1 className="tsame">Pending Coverage</h1>
          </button>
          <button onClick={this.showSupervisorApproval}>
            <h1 className="tspecial">Pending Supervisor Approval</h1>
          </button>
          <button onClick={this.showHistory}>
            <h1 className="tsame">Request History</h1>
          </button>
        </div>
        {pending}
      </div>
    );
  }
}
