import React from "react";
import Layout from "./Layout.js";
import OpenShiftsCal from "../Calendar/OpenShiftsCal";

export default function SleCalendar(props) {
  return (
    <Layout>
      <div class="OpenShiftsCal">
        <OpenShiftsCal userId={props.match.params.userId} />
      </div>
    </Layout>
  );
}
