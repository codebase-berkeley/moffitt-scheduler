import React from "react";

import { SupervisorLayout } from "../Layout/Layout";
import PendingCoverage from "../Cover/PendingCoverage";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout>
      <PendingCoverage />
    </SupervisorLayout>
  );
}
