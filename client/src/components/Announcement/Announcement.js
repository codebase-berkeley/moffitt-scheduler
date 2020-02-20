import React from "react";
import Past from "./Past";
import "./Announcement.css";

export default function Announcement() {
    return (
        <div className="all">
            <div className="add_title">
                <h2>Add Announcement</h2>
            </div>
            <div className="announcement_box">
                <div className="messagebox">
                    <div className="entertext"></div>
                    <div className="submit">
                        <p>Submit</p>
                    </div>
                </div>
            </div>
            <div className="past_section">
                <div className="past_title">
                    <h2>Past Announcements</h2>
                </div>
                <div className="past_ann">
                    <Past
                    past_ann="Hi I'm Kerry and I'm going to Kerry-oke"
                    />
                    <Past
                    past_ann="Go Bears!"
                    />
                </div>
            </div>
        </div>
    )
}