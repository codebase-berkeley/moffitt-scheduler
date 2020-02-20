import React from "react";
import "./Past.css";

export default function Past(props) {
    return (
        <div className="p_announcement">
            <div className="left">
                <p className="past_ann">{props.past_ann}</p>
            </div>
            <div className="right">
                <p className="delete">Delete</p>
            </div>
        </div>
    );
  }