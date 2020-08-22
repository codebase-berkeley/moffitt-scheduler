import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import { YourShifts } from "../Calendar/YourShifts";

export default function SleCalendar(props) {
  return (
    <SleLayout title="Your Shifts">
      <YourShifts userId={props.match.params.userId} />
    </SleLayout>
  );
}
