import React from "react";

import { SupervisorLayout } from "../Layout/Layout";
import MSRenderer from "../MasterSchedule/MSRenderer";
import ScrollLock from "react-scrolllock";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout>
      <div class="coverz">
        <MSRenderer />
      </div>
    </SupervisorLayout>
  );
}
