import React from "react";
import Layout from "./Layout.js";
import StaticCalendar from "../Calendar/StaticCalendar";

export default function SleCalendar(props) {
  return (
    <Layout>
      <div class="StaticCalendar">
        <StaticCalendar userId={props.match.params.userId} />
      </div>
    </Layout>
  );
}
