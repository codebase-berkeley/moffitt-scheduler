import React from "react";
import { CoverHeader } from "./CoverUtils";

import "./Cover.css";

class PendingCoverage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CoverHeader tab="pendingapproval" />;
  }
}

export default PendingCoverage;
