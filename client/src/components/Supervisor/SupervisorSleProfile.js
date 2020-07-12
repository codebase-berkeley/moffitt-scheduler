import React from "react";
import { SupervisorLayout } from "../Layout/Layout.js";
import EmployeeProfile from "../Profile/EmployeeProfile";

export default function SleCalendar(props) {
  return (
    <SupervisorLayout>
      <EmployeeProfile userId={props.match.params.userId} is_sup={true} />
    </SupervisorLayout>
  );
}
