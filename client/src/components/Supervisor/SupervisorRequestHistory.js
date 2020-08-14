import React from "react";

import { SupervisorLayout } from "../Layout/Layout";
import RequestHistory from "../Cover/RequestHistory";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout>
      <RequestHistory />
    </SupervisorLayout>
  );
}
