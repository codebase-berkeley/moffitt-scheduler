import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import StaticCalendar from "../Calendar/StaticCalendar";

export default function SleCalendar(props) {
  return (
    <SleLayout title="Your Shifts">
      <div class="StaticCalendar center">
        <StaticCalendar userId={props.match.params.userId} />
      </div>
    </SleLayout>
  );
}
