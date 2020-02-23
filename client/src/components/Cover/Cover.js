import React from "react";
import PendingCov from "./PendingCov";
import "./Cover.css";

export default function Cover() {
    return (
        <div className="all">
            <div className="past_section">
                <div className="past_ann">
                <PendingCov
                    desk="Front Desk"
                    loc="Moffitt"
                    date="Wednesday, March 6, 2020"
                    time="3:00 PM - 5:00 PM"
                    needname="Broco Lee"
                    message="Going home for the weekend"
                />
                <PendingCov
                    desk="Front Desk"
                    loc="Moffitt"
                    date="Thursday, March 7, 2020"
                    time="3:00 PM - 5:00 PM"
                    needname="Ug Lee"
                    message="Need extra sleep"
                />
                <PendingCov
                    desk="Front Desk"
                    loc="Moffitt"
                    date="Friday, March 8, 2020"
                    time="2:00 PM - 4:00 PM"
                    needname="Fami Lee"
                    // message="Going home for the weekend"
                />
                </div>
            </div>
        </div>
    );
}