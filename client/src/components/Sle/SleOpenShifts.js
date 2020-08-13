import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import OpenShifts from "../Calendar/OpenShifts";

export default function SleCalendar(props) {
  return (
    <SleLayout title="Open Shifts">
      <OpenShifts userId={props.match.params.userId} />
    </SleLayout>
  );
}
