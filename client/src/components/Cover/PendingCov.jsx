import React from "react";
import "./PendingCov.css";

export default function PendingCov(props) {
    return (
        <div className="shift">
            <div className="time_loc">
                <p className="desk">{props.desk}</p>
                <p className="loc">{props.loc}</p>
                <p className="date">{props.loc}</p>
                <p className="time">{props.time}</p>
            </div>
            <div className="need_cov">
                <p className="needname">{props.needname}</p>
            </div>
            <div className="notes">
                <p className="message">{props.message}</p>
            </div>
        </div>
    );
  }