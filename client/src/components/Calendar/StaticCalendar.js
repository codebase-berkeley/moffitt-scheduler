import React from "react";
import "./StaticCalendar.css";
import { render } from "@testing-library/react";
import { format, startOfWeek, endOfWeek } from "date-fns";


export default class StaticCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.currentDate = new Date();
        this.weekString =
            format(this.currentDate, "MMMM") +
            " " +
            format(this.currentDate, "YYYY") +
            ": " +
            format(startOfWeek(this.currentDate), "MM/DD") +
            " - " +
            format(endOfWeek(this.currentDate), "MM/DD");
    }

    render() {
        return (
            <div id="overall-container">
                <div class="schedule-container">
                    <h1 id="weekString">{this.weekString}</h1>
                </div>
            </div>
        )
    }
}
