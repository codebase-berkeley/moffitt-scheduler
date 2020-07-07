import React from "react";
import {SleLayout} from "../Layout/Layout.js";
import Calendar from "../Calendar/Calendar.js";

export default function SleCalendar(props) {
  return (
    <SleLayout titles={["Your Shifts"]}>
      <div class="Calendar">
        <Calendar userId={props.match.params.userId} />
      </div>
    </SleLayout>
  );
}
