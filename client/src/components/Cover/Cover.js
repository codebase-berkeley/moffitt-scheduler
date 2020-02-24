import React from "react";
import PendingCov from "./PendingCov";
import "./Cover.css";

export default function Cover() {
    return (
        <div className="all">
            <div className="topWordssss">
                <h1 className="tspecial">Pending Coverage</h1>
                <h1 className="tsame">Pending Supervisor Approval</h1>
                <h1 className="tsame">Request History</h1>
            </div>
            <div className="middleWordssss">
                <h2 className="msame1">Time and Location</h2>
                <h2 className="msame">Needing Coverage</h2>
                <h2 className="msame">Notes</h2>
                <h2 className="msame2"></h2>
            </div>
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
    );
}