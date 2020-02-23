import React from "react";
import "./WithCheck.css";

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
            <div className="notes">
                <p className="message">{props.message}</p>
            </div>
            <div className ="approval"> 
                <p className="check">{props.check}</p>
                <p className="deny">{props.check}</p>
            </div>
        </div>
    );
  }