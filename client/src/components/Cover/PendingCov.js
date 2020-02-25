import React from "react";
import "./PendingCov.css";

export default function PendingCov(props) {
  return (
    <div className="shift1">
      <div className="time_loc1">
        <div className="firstrow1">
          <div className="bold_desk1">
            <p className="desk">{props.desk}</p>
          </div>
          <div className="colorful_box1">
            <p className="loc">{props.loc}</p>
          </div>
        </div>
        <p className="date1">{props.date}</p>
        <p className="time">{props.time}</p>
      </div>
      <div className="need_cov1">
        <p className="needname">{props.needname}</p>
      </div>
      <div className="notes1">
        <p className="message">{props.message}</p>
      </div>
    </div>
  );
}
