import React from "react";
import "./WithCheck.css";
import check from "../check.png";
import cross from "../cross.png";

export default function WithCheck(props) {
  return (
    <div className="shift">
      <div className="time_loc">
        <div className="firstrow">
          <div className="bold_desk">
            <p className="desk">{props.desk}</p>
          </div>
          <div className="colorful_box">
            <p className="loc">{props.loc}</p>
          </div>
        </div>
        <p className="date">{props.date}</p>
        <p className="time">{props.time}</p>
      </div>
      <div className="need_cov">
        <p className="needname">{props.needname}</p>
      </div>
      <div className="covering">
        <p className="covername">{props.covername}</p>
      </div>
      <div className="approval">
        <img className="check" src={check} alt="check" />
        <img className="deny" src={cross} alt="deny" />
      </div>
    </div>
  );
}

loginClick(e) {
  console.log("In click function");
  var approve = document.getElementById("approve");
  var deny = document.getElementById("deny");
  fetch("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ approve: approve, deny: deny })
  })
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
    });
}
