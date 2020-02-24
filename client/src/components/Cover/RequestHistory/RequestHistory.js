import React from "react";
import "./RequestHistory.css";
import WithCheck from "../WithCheck";
// 

export default function RequestHistory() {
    return (
        <div>
            <div className="topWordsss">
                <h1 className="tsame">Pending Coverage</h1>
                <h1 className="tsame">Pending Supervisor Approval</h1>
                <h1 className="tspecial">Request History</h1>
            </div>
            <div className="middleWordsss">
                <h2 className="msame1">Time and Location</h2>
                <h2 className="msame">Needing Coverage</h2>
                <h2 className="msame">Covered By</h2>
                <h2 className="msame2"></h2>
            </div>
            <div className="shiftHistory">
            <WithCheck
                desk="Front Desk"
                loc="Moffitt"
                date="Wednesday, March 6, 2020"
                time="3:00 PM - 5:00 PM"
                needname="Broco Lee"
                covername="Ug Lee"
            />
            <WithCheck
                desk="Front Desk"
                loc="Moffitt"
                date="Wednesday, March 6, 2020"
                time="3:00 PM - 5:00 PM"
                needname="Broco Lee"
                covername="Ug Lee"
            />
            </div>
        </div>
    );
}