import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

function Timeslot(props) {
  return <div class="item-cell" style={{ backgroundColor: props.color }}></div>;
}

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    var a = new Array(24);
    for (var i = 0; i <= 23; i += 1) {
      a[i] = new Array(7);
    }
    this.state = { grid: a };
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

  componentDidMount() {
    console.log("mount");
    fetch("/staticcalendar")
      .then(response => {
        console.log("response");
        return response.json();
      })
      .then(jsonResponse => {
        console.log("test");
        this.setState({ grid: jsonResponse.schedule });
      });
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
            <Timeslot x={0} y={0} color={this.state.grid[0][0]} />
            <Timeslot x={0} y={1} color={this.state.grid[0][1]} />
            <Timeslot x={0} y={2} color={this.state.grid[0][2]} />
            <Timeslot x={0} y={3} color={this.state.grid[0][3]} />
            <Timeslot x={0} y={4} color={this.state.grid[0][4]} />
            <Timeslot x={0} y={5} color={this.state.grid[0][5]} />
            <Timeslot x={0} y={6} color={this.state.grid[0][6]} />

            <div class="item-hours">1am</div>
            <Timeslot x={1} y={0} color={this.state.grid[1][0]} />
            <Timeslot x={1} y={1} color={this.state.grid[1][1]} />
            <Timeslot x={1} y={2} color={this.state.grid[1][2]} />
            <Timeslot x={1} y={3} color={this.state.grid[1][3]} />
            <Timeslot x={1} y={4} color={this.state.grid[1][4]} />
            <Timeslot x={1} y={5} color={this.state.grid[1][5]} />
            <Timeslot x={1} y={6} color={this.state.grid[1][6]} />

            <div class="item-hours">2am</div>
            <Timeslot x={2} y={0} color={this.state.grid[2][0]} />
            <Timeslot x={2} y={1} color={this.state.grid[2][1]} />
            <Timeslot x={2} y={2} color={this.state.grid[2][2]} />
            <Timeslot x={2} y={3} color={this.state.grid[2][3]} />
            <Timeslot x={2} y={4} color={this.state.grid[2][4]} />
            <Timeslot x={2} y={5} color={this.state.grid[2][5]} />
            <Timeslot x={2} y={6} color={this.state.grid[2][6]} />

            <div class="item-hours">3am</div>
            <Timeslot x={3} y={0} color={this.state.grid[3][0]} />
            <Timeslot x={3} y={1} color={this.state.grid[3][1]} />
            <Timeslot x={3} y={2} color={this.state.grid[3][2]} />
            <Timeslot x={3} y={3} color={this.state.grid[3][3]} />
            <Timeslot x={3} y={4} color={this.state.grid[3][4]} />
            <Timeslot x={3} y={5} color={this.state.grid[3][5]} />
            <Timeslot x={3} y={6} color={this.state.grid[3][6]} />

            <div class="item-hours">4am</div>
            <Timeslot x={4} y={0} color={this.state.grid[4][0]} />
            <Timeslot x={4} y={1} color={this.state.grid[4][1]} />
            <Timeslot x={4} y={2} color={this.state.grid[4][2]} />
            <Timeslot x={4} y={3} color={this.state.grid[4][3]} />
            <Timeslot x={4} y={4} color={this.state.grid[4][4]} />
            <Timeslot x={4} y={5} color={this.state.grid[4][5]} />
            <Timeslot x={4} y={6} color={this.state.grid[4][6]} />

            <div class="item-hours">5am</div>
            <Timeslot x={5} y={0} color={this.state.grid[5][0]} />
            <Timeslot x={5} y={1} color={this.state.grid[5][1]} />
            <Timeslot x={5} y={2} color={this.state.grid[5][2]} />
            <Timeslot x={5} y={3} color={this.state.grid[5][3]} />
            <Timeslot x={5} y={4} color={this.state.grid[5][4]} />
            <Timeslot x={5} y={5} color={this.state.grid[5][5]} />
            <Timeslot x={5} y={6} color={this.state.grid[5][6]} />

            <div class="item-hours">6am</div>
            <Timeslot x={6} y={0} color={this.state.grid[6][0]} />
            <Timeslot x={6} y={1} color={this.state.grid[6][1]} />
            <Timeslot x={6} y={2} color={this.state.grid[6][2]} />
            <Timeslot x={6} y={3} color={this.state.grid[6][3]} />
            <Timeslot x={6} y={4} color={this.state.grid[6][4]} />
            <Timeslot x={6} y={5} color={this.state.grid[6][5]} />
            <Timeslot x={6} y={6} color={this.state.grid[6][6]} />

            <div class="item-hours">7am</div>
            <Timeslot x={7} y={0} color={this.state.grid[7][0]} />
            <Timeslot x={7} y={1} color={this.state.grid[7][1]} />
            <Timeslot x={7} y={2} color={this.state.grid[7][2]} />
            <Timeslot x={7} y={3} color={this.state.grid[7][3]} />
            <Timeslot x={7} y={4} color={this.state.grid[7][4]} />
            <Timeslot x={7} y={5} color={this.state.grid[7][5]} />
            <Timeslot x={7} y={6} color={this.state.grid[7][6]} />

            <div class="item-hours">8am</div>
            <Timeslot x={8} y={0} color={this.state.grid[8][0]} />
            <Timeslot x={8} y={1} color={this.state.grid[8][1]} />
            <Timeslot x={8} y={2} color={this.state.grid[8][2]} />
            <Timeslot x={8} y={3} color={this.state.grid[8][3]} />
            <Timeslot x={8} y={4} color={this.state.grid[8][4]} />
            <Timeslot x={8} y={5} color={this.state.grid[8][5]} />
            <Timeslot x={8} y={6} color={this.state.grid[8][6]} />

            <div class="item-hours">9am</div>
            <Timeslot x={9} y={0} color={this.state.grid[9][0]} />
            <Timeslot x={9} y={1} color={this.state.grid[9][1]} />
            <Timeslot x={9} y={2} color={this.state.grid[9][2]} />
            <Timeslot x={9} y={3} color={this.state.grid[9][3]} />
            <Timeslot x={9} y={4} color={this.state.grid[9][4]} />
            <Timeslot x={9} y={5} color={this.state.grid[9][5]} />
            <Timeslot x={9} y={6} color={this.state.grid[9][6]} />

            <div class="item-hours">10am</div>
            <Timeslot x={10} y={0} color={this.state.grid[10][0]} />
            <Timeslot x={10} y={1} color={this.state.grid[10][1]} />
            <Timeslot x={10} y={2} color={this.state.grid[10][2]} />
            <Timeslot x={10} y={3} color={this.state.grid[10][3]} />
            <Timeslot x={10} y={4} color={this.state.grid[10][4]} />
            <Timeslot x={10} y={5} color={this.state.grid[10][5]} />
            <Timeslot x={10} y={6} color={this.state.grid[10][6]} />

            <div class="item-hours">11am</div>
            <Timeslot x={11} y={0} color={this.state.grid[11][0]} />
            <Timeslot x={11} y={1} color={this.state.grid[11][1]} />
            <Timeslot x={11} y={2} color={this.state.grid[11][2]} />
            <Timeslot x={11} y={3} color={this.state.grid[11][3]} />
            <Timeslot x={11} y={4} color={this.state.grid[11][4]} />
            <Timeslot x={11} y={5} color={this.state.grid[11][5]} />
            <Timeslot x={11} y={6} color={this.state.grid[11][6]} />

            <div class="item-hours">12pm</div>
            <Timeslot x={12} y={0} color={this.state.grid[12][0]} />
            <Timeslot x={12} y={1} color={this.state.grid[12][1]} />
            <Timeslot x={12} y={2} color={this.state.grid[12][2]} />
            <Timeslot x={12} y={3} color={this.state.grid[12][3]} />
            <Timeslot x={12} y={4} color={this.state.grid[12][4]} />
            <Timeslot x={12} y={5} color={this.state.grid[12][5]} />
            <Timeslot x={12} y={6} color={this.state.grid[12][6]} />

            <div class="item-hours">1pm</div>
            <Timeslot x={13} y={0} color={this.state.grid[13][0]} />
            <Timeslot x={13} y={1} color={this.state.grid[13][1]} />
            <Timeslot x={13} y={2} color={this.state.grid[13][2]} />
            <Timeslot x={13} y={3} color={this.state.grid[13][3]} />
            <Timeslot x={13} y={4} color={this.state.grid[13][4]} />
            <Timeslot x={13} y={5} color={this.state.grid[13][5]} />
            <Timeslot x={13} y={6} color={this.state.grid[13][6]} />

            <div class="item-hours">2pm</div>
            <Timeslot x={14} y={0} color={this.state.grid[14][0]} />
            <Timeslot x={14} y={1} color={this.state.grid[14][1]} />
            <Timeslot x={14} y={2} color={this.state.grid[14][2]} />
            <Timeslot x={14} y={3} color={this.state.grid[14][3]} />
            <Timeslot x={14} y={4} color={this.state.grid[14][4]} />
            <Timeslot x={14} y={5} color={this.state.grid[14][5]} />
            <Timeslot x={14} y={6} color={this.state.grid[14][6]} />

            <div class="item-hours">3pm</div>
            <Timeslot x={15} y={0} color={this.state.grid[15][0]} />
            <Timeslot x={15} y={1} color={this.state.grid[15][1]} />
            <Timeslot x={15} y={2} color={this.state.grid[15][2]} />
            <Timeslot x={15} y={3} color={this.state.grid[15][3]} />
            <Timeslot x={15} y={4} color={this.state.grid[15][4]} />
            <Timeslot x={15} y={5} color={this.state.grid[15][5]} />
            <Timeslot x={15} y={6} color={this.state.grid[15][6]} />

            <div class="item-hours">4pm</div>
            <Timeslot x={16} y={0} color={this.state.grid[16][0]} />
            <Timeslot x={16} y={1} color={this.state.grid[16][1]} />
            <Timeslot x={16} y={2} color={this.state.grid[16][2]} />
            <Timeslot x={16} y={3} color={this.state.grid[16][3]} />
            <Timeslot x={16} y={4} color={this.state.grid[16][4]} />
            <Timeslot x={16} y={5} color={this.state.grid[16][5]} />
            <Timeslot x={16} y={6} color={this.state.grid[16][6]} />

            <div class="item-hours">5pm</div>
            <Timeslot x={17} y={0} color={this.state.grid[17][0]} />
            <Timeslot x={17} y={1} color={this.state.grid[17][1]} />
            <Timeslot x={17} y={2} color={this.state.grid[17][2]} />
            <Timeslot x={17} y={3} color={this.state.grid[17][3]} />
            <Timeslot x={17} y={4} color={this.state.grid[17][4]} />
            <Timeslot x={17} y={5} color={this.state.grid[17][5]} />
            <Timeslot x={17} y={6} color={this.state.grid[17][6]} />

            <div class="item-hours">6pm</div>
            <Timeslot x={18} y={0} color={this.state.grid[18][0]} />
            <Timeslot x={18} y={1} color={this.state.grid[18][1]} />
            <Timeslot x={18} y={2} color={this.state.grid[18][2]} />
            <Timeslot x={18} y={3} color={this.state.grid[18][3]} />
            <Timeslot x={18} y={4} color={this.state.grid[18][4]} />
            <Timeslot x={18} y={5} color={this.state.grid[18][5]} />
            <Timeslot x={18} y={6} color={this.state.grid[18][6]} />

            <div class="item-hours">7pm</div>
            <Timeslot x={19} y={0} color={this.state.grid[19][0]} />
            <Timeslot x={19} y={1} color={this.state.grid[19][1]} />
            <Timeslot x={19} y={2} color={this.state.grid[19][2]} />
            <Timeslot x={19} y={3} color={this.state.grid[19][3]} />
            <Timeslot x={19} y={4} color={this.state.grid[19][4]} />
            <Timeslot x={19} y={5} color={this.state.grid[19][5]} />
            <Timeslot x={19} y={6} color={this.state.grid[19][6]} />

            <div class="item-hours">8pm</div>
            <Timeslot x={20} y={0} color={this.state.grid[20][0]} />
            <Timeslot x={20} y={1} color={this.state.grid[20][1]} />
            <Timeslot x={20} y={2} color={this.state.grid[20][2]} />
            <Timeslot x={20} y={3} color={this.state.grid[20][3]} />
            <Timeslot x={20} y={4} color={this.state.grid[20][4]} />
            <Timeslot x={20} y={5} color={this.state.grid[20][5]} />
            <Timeslot x={20} y={6} color={this.state.grid[20][6]} />

            <div class="item-hours">9pm</div>
            <Timeslot x={21} y={0} color={this.state.grid[21][0]} />
            <Timeslot x={21} y={1} color={this.state.grid[21][1]} />
            <Timeslot x={21} y={2} color={this.state.grid[21][2]} />
            <Timeslot x={21} y={3} color={this.state.grid[21][3]} />
            <Timeslot x={21} y={4} color={this.state.grid[21][4]} />
            <Timeslot x={21} y={5} color={this.state.grid[21][5]} />
            <Timeslot x={21} y={6} color={this.state.grid[21][6]} />

            <div class="item-hours">10pm</div>
            <Timeslot x={22} y={0} color={this.state.grid[22][0]} />
            <Timeslot x={22} y={1} color={this.state.grid[22][1]} />
            <Timeslot x={22} y={2} color={this.state.grid[22][2]} />
            <Timeslot x={22} y={3} color={this.state.grid[22][3]} />
            <Timeslot x={22} y={4} color={this.state.grid[22][4]} />
            <Timeslot x={22} y={5} color={this.state.grid[22][5]} />
            <Timeslot x={22} y={6} color={this.state.grid[22][6]} />

            <div class="item-hours">11pm</div>
            <Timeslot x={23} y={0} color={this.state.grid[23][0]} />
            <Timeslot x={23} y={1} color={this.state.grid[23][1]} />
            <Timeslot x={23} y={2} color={this.state.grid[23][2]} />
            <Timeslot x={23} y={3} color={this.state.grid[23][3]} />
            <Timeslot x={23} y={4} color={this.state.grid[23][4]} />
            <Timeslot x={23} y={5} color={this.state.grid[23][5]} />
            <Timeslot x={23} y={6} color={this.state.grid[23][6]} />
          </div>
        </div>
      </div>
    );
  }
}
