import React from "react";
import Layout from "./Layout.js";
import Calendar from "../Calendar/Calendar.js";

export default function SleCalendar(props) {
  return (
    <Layout>
      <div class="Calendar">
        <Calendar userId={props.match.params.userId} />
      </div>
    </Layout>
  );
}
