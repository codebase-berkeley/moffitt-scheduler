import React from "react";
import "./PendingCov.css";

export default function PendingCov(props) {
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
            <div className="notes">
                <p className="message">{props.message}</p>
            </div>
        </div>
    );
  }