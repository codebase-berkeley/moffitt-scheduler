import React from "react";
import { SupervisorLayout } from "../Layout/Layout.js";
import Builder from "../Schedule/Builder";

export default function SupervisorCover(props) {
  return (
    <SupervisorLayout title="Schedule Builder">
      <Builder />
    </SupervisorLayout>
  );
}
