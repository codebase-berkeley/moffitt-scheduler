import React from "react";
import PendingCov from "./PendingCov";
import "./Cover.css";

export default function Cover() {
    return (
        <div className="all">
            <p>hello world!</p>
            <div className="past_section">
                <div className="past_ann">
                <PendingCov
                    desk="Front Desk"
                    loc="Moffitt"
                    date="Wednesday, March 6, 2020"
                    time="3:00 PM - 5:00 PM"
                    needname="Ug Lee"
                    message="hello"
                />
                </div>
            </div>
        </div>
    );
}