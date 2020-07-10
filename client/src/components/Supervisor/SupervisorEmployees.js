import React from "react";
import { SupervisorLayout } from "../Layout/Layout.js";
import Employees from "../Employees/Employees";

export default function SupervisorEmployee(props) {
  return (
    <SupervisorLayout title="Employees">
      <div class="employees">
        <Employees />
      </div>
    </SupervisorLayout>
  );
}
