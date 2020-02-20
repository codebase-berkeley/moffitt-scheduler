import React from "react";
import "./EachEmployee.css";

export default function EachEmployee(props) {
    return (
    <div className="someEmployee">
        <div className="textFormat">
            <div class="sphere"></div>
            <div className="vertical">
                <h2 className="name">{props.name}</h2>
                <h3 className="email">{props.email}</h3>
            </div>
            <div className="lib">
                <h2 className="first">{props.firstLibrary}</h2>
                <h2 className="second">{props.secondLibrary}</h2>
            </div>
            </div>
        
    </div>
    );
}