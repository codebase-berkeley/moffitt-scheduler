import React from "react";
import {SleLayout} from "../Layout/Layout.js";
import OpenShiftsCal from "../Calendar/OpenShiftsCal";

export default function SleCalendar(props) {
  return (
    <SleLayout>
      <div class="OpenShiftsCal">
        <OpenShiftsCal userId={props.match.params.userId} />
      </div>
    </SleLayout>
  );
}
