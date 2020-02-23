import React from "react";
import "./PendingSupervisor.css";

export default function PendingSupervisor() {
    return (
        <div>
            <div className="topWords">
                <h1 className="tsame">Pending Coverage</h1>
                <h1 className="tspecial">Pending Supervisor Approval</h1>
                <h1 className="tsame">Request History</h1>
            </div>
            <div className="middleWords">
                <h2 className="msame1">Time and Location</h2>
                <h2 className="msame">Needing Coverage</h2>
                <h2 className="msame">Covered By</h2>
                <h2 className="msame2"></h2>
            </div>
        </div>
    );
}