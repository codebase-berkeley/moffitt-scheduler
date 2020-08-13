import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import Availability from "../Calendar/Availability";

export default function SleCalendar(props) {
  return (
    <SleLayout title="Enter Availability">
      <Availability userId={props.match.params.userId} />
    </SleLayout>
  );
}
