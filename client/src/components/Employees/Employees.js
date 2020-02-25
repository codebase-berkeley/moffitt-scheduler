import React from "react";
import "./Employees.css";
import EachEmployee from "./EachEmployee";

export default function Employees() {
  return (
    <div>
      <div className="topWordss">
        <h1 className="header">Employees</h1>
        <h2 className="add">+Add Employee</h2>
      </div>
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
      <EachEmployee
        name="Sahil Thakur"
        email="sahilthakur@berkeley.edu"
        firstLibrary="Moffitt"
        secondLibrary="Doe"
      />
    </div>
  );
}
