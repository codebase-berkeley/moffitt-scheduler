import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek } from "date-fns";

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
            <div class="item-wday">Su 02/23</div>
            <div class="item-wday">Mo 02/24</div>
            <div class="item-wday">Tu 02/25</div>
            <div class="item-wday">We 02/26</div>
            <div class="item-wday">Th 02/27</div>
            <div class="item-wday">Fr 02/28</div>
            <div class="item-wday">Sa 02/29</div>

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
