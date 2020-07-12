import React from "react";
import { SleLayout } from "../Layout/Layout.js";
import EmployeeProfile from "../Profile/EmployeeProfile";

export default function Profile(props) {
  return (
    <SleLayout>
      <EmployeeProfile userId={props.match.params.userId} />
    </SleLayout>
  );
}
