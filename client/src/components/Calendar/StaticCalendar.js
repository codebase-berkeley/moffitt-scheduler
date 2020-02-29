import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

class Timeslot extends React.Component {
  constructor(props) {
    super(props);
    this.x = props.x;
    this.y = props.y;
    this.color = props.color;
  }
  render() {
    return <div class="item-cell" style={{ backgroundColor: this.color }}></div>;
  }
}

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [] };
    this.grid = new Array(7);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(23);
    }
    for (var col = 0; col < this.grid.length; col++) {
      for (var row = 0; row < this.grid[col].length; row++) {
        this.grid[col][row] = new Timeslot(row, col, "gray");
      }
    }
    this.groups = [];
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

  randomSchedule() {
    for (var r = 9; r <= 15; r++) {
      this.grid[0][r].color = "pink";
    }
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
            {this.grid[0][0]}
            {this.grid[1][0]}
            {this.grid[2][0]}
            {this.grid[3][0]}
            {this.grid[4][0]}
            {this.grid[5][0]}
            {this.grid[6][0]}
            {/* <Timeslot x={0} y={0} />
            <Timeslot x={0} y={1} />
            <Timeslot x={0} y={2} />
            <Timeslot x={0} y={3} />
            <Timeslot x={0} y={4} />
            <Timeslot x={0} y={5} />
            <Timeslot x={0} y={6} /> */}

            <div class="item-hours">1am</div>
            <Timeslot x={1} y={0} />
            <Timeslot x={1} y={1} />
            <Timeslot x={1} y={2} />
            <Timeslot x={1} y={3} />
            <Timeslot x={1} y={4} />
            <Timeslot x={1} y={5} />
            <Timeslot x={1} y={6} />

            <div class="item-hours">2am</div>
            <Timeslot x={2} y={0} />
            <Timeslot x={2} y={1} />
            <Timeslot x={2} y={2} />
            <Timeslot x={2} y={3} />
            <Timeslot x={2} y={4} />
            <Timeslot x={2} y={5} />
            <Timeslot x={2} y={6} />

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
