import React from "react";

import { SupervisorLayout } from "../Layout/Layout";
import MasterSchedule from "../MasterSchedule/Master";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout title="Master Schedule">
      <MasterSchedule />
    </SupervisorLayout>
  );
}
