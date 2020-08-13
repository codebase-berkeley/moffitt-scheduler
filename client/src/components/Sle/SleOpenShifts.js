import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import OpenShifts from "../Calendar/OpenShiftsCal";

export default function SleCalendar(props) {
  return (
    <SleLayout title="Open Shifts">
      <div class="OpenShiftsCal center">
        <OpenShifts userId={props.match.params.userId} />
      </div>
    </SleLayout>
  );
}
