import React from 'react';
import './Calendar.css'

function DayIndicator(props) {
    return(
        <div class="day-indicator">
            <h1 class="day">Sunday</h1>
        </div>
    )
}

function Day(props) {
    return(
        <div class="day-column">
            
        </div>
    )
}

function Calendar(props) {
    return(
        <div class="calendar-container">
            <div class="calendar-out">
                <div class="calendar">
                    <DayIndicator/>
                    <Day day="Sunday"/>
                    <Day day="Monday"/>
                    <Day day="Tuesday"/>
                    <Day day="Wednesday"/>
                    <Day day="Thursday"/>
                    <Day day="Friday"/>
                    <Day day="Saturday"/>
                </div> 
            </div>
        </div>
    )
}

export default Calendar