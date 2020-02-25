import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [] };

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
        <div id="schedule-container-st">
          <h1 id="weekString">{this.weekString}</h1>
          <div id="inner-schedule">
            <div></div>
            <div class="item-wday">
              {format(startOfWeek(this.currentDate), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(this.currentDate), 1), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(this.currentDate), 2), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(this.currentDate), 3), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(this.currentDate), 4), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(this.currentDate), 5), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(endOfWeek(this.currentDate), "dd MM/DD")}
            </div>

            <div class="item-hours">12am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">1am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">2am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">3am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">4am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">5am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">6am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">7am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">8am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">9am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">10am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">11am</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">12pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">1pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">2pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">3pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">4pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">5pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">6pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">7pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">8pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">9pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">10pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>

            <div class="item-hours">11pm</div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
            <div class="item-cell"></div>
          </div>
        </div>
      </div>
    );
  }
}
