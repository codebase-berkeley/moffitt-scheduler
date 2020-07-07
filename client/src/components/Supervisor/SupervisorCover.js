import React from "react";
import { SupervisorLayout } from "../Layout/Layout.js";
import Cover from "../Cover/Cover";

export default function SupervisorCover(props) {
  return (
    <SupervisorLayout titles={["Your Shifts"]}>
      <div class="cover">
        <Cover />
      </div>
    </SupervisorLayout>
  );
}
