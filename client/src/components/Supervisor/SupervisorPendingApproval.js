import React from "react";

import { SupervisorLayout } from "../Layout/Layout";
import PendingApproval from "../Cover/PendingApproval";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout>
      <PendingApproval />
    </SupervisorLayout>
  );
}
