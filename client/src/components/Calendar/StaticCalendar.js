import React from "react";
import "./StaticCalendar.css";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

function Timeslot(props) {
  return <div class="item-cell" style={{ backgroundColor: props.color }}></div>;
}

class Shift {
  constructor(color, id, start, end, day) {
    this.color = color;
    this.id = id;
    this.start = start;
    this.end = end;
    this.day = day;
  }
}

function initialShifts() {
  let a = [];
  for (var i = 0; i < 168; i += 1) {
    a.push(new Shift("#f8f8f8", null, null, null, null));
  }
  let count = 0;
  for (var i = 0; i <= 23; i += 1) {
    for (var j = 0; j <= 6; j += 1) {
      a[count].start = i;
      a[count].end = i + 1;
      a[count].day = j;
      count += 1;
    }
  }
  return a;
}

var currentDate = new Date();
var weekString =
  format(currentDate, "MMMM") +
  " " +
  format(currentDate, "YYYY") +
  ": " +
  format(startOfWeek(currentDate), "MM/DD") +
  " - " +
  format(endOfWeek(currentDate), "MM/DD");

export default class StaticCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shifts: initialShifts() };
  }

  componentDidMount() {
    fetch("/staticcalendar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: this.state.shifts })
    })
      .then(response => {
        console.log("response");
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse.shifts);
        this.setState({ shifts: jsonResponse.shifts });
      });
  }

  render() {
    return (
      <div id="overall-container">
        <div id="schedule-container-st">
          <h1 id="weekString">{weekString}</h1>
          <div id="inner-schedule">
            <div></div>
            <div class="item-wday">
              {format(startOfWeek(currentDate), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(currentDate), 1), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(currentDate), 2), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(currentDate), 3), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(currentDate), 4), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(addDays(startOfWeek(currentDate), 5), "dd MM/DD")}
            </div>
            <div class="item-wday">
              {format(endOfWeek(currentDate), "dd MM/DD")}
            </div>

            <div class="item-hours">12am</div>
            <Timeslot color={this.state.shifts[0].color} />
            <Timeslot color={this.state.shifts[1].color} />
            <Timeslot color={this.state.shifts[2].color} />
            <Timeslot color={this.state.shifts[3].color} />
            <Timeslot color={this.state.shifts[4].color} />
            <Timeslot color={this.state.shifts[5].color} />
            <Timeslot color={this.state.shifts[6].color} />

            <div class="item-hours">1am</div>
            <Timeslot color={this.state.shifts[7].color} />
            <Timeslot color={this.state.shifts[8].color} />
            <Timeslot color={this.state.shifts[9].color} />
            <Timeslot color={this.state.shifts[10].color} />
            <Timeslot color={this.state.shifts[11].color} />
            <Timeslot color={this.state.shifts[12].color} />
            <Timeslot color={this.state.shifts[13].color} />

            <div class="item-hours">2am</div>
            <Timeslot color={this.state.shifts[14].color} />
            <Timeslot color={this.state.shifts[15].color} />
            <Timeslot color={this.state.shifts[16].color} />
            <Timeslot color={this.state.shifts[17].color} />
            <Timeslot color={this.state.shifts[18].color} />
            <Timeslot color={this.state.shifts[19].color} />
            <Timeslot color={this.state.shifts[20].color} />

            <div class="item-hours">3am</div>
            <Timeslot color={this.state.shifts[21].color} />
            <Timeslot color={this.state.shifts[22].color} />
            <Timeslot color={this.state.shifts[23].color} />
            <Timeslot color={this.state.shifts[24].color} />
            <Timeslot color={this.state.shifts[25].color} />
            <Timeslot color={this.state.shifts[26].color} />
            <Timeslot color={this.state.shifts[27].color} />

            <div class="item-hours">4am</div>
            <Timeslot color={this.state.shifts[28].color} />
            <Timeslot color={this.state.shifts[29].color} />
            <Timeslot color={this.state.shifts[30].color} />
            <Timeslot color={this.state.shifts[31].color} />
            <Timeslot color={this.state.shifts[32].color} />
            <Timeslot color={this.state.shifts[33].color} />
            <Timeslot color={this.state.shifts[34].color} />

            <div class="item-hours">5am</div>
            <Timeslot color={this.state.shifts[35].color} />
            <Timeslot color={this.state.shifts[36].color} />
            <Timeslot color={this.state.shifts[37].color} />
            <Timeslot color={this.state.shifts[38].color} />
            <Timeslot color={this.state.shifts[39].color} />
            <Timeslot color={this.state.shifts[40].color} />
            <Timeslot color={this.state.shifts[41].color} />

            <div class="item-hours">6am</div>
            <Timeslot color={this.state.shifts[42].color} />
            <Timeslot color={this.state.shifts[43].color} />
            <Timeslot color={this.state.shifts[44].color} />
            <Timeslot color={this.state.shifts[45].color} />
            <Timeslot color={this.state.shifts[46].color} />
            <Timeslot color={this.state.shifts[47].color} />
            <Timeslot color={this.state.shifts[48].color} />

            <div class="item-hours">7am</div>
            <Timeslot color={this.state.shifts[49].color} />
            <Timeslot color={this.state.shifts[50].color} />
            <Timeslot color={this.state.shifts[51].color} />
            <Timeslot color={this.state.shifts[52].color} />
            <Timeslot color={this.state.shifts[53].color} />
            <Timeslot color={this.state.shifts[54].color} />
            <Timeslot color={this.state.shifts[55].color} />

            <div class="item-hours">8am</div>
            <Timeslot color={this.state.shifts[56].color} />
            <Timeslot color={this.state.shifts[57].color} />
            <Timeslot color={this.state.shifts[58].color} />
            <Timeslot color={this.state.shifts[59].color} />
            <Timeslot color={this.state.shifts[60].color} />
            <Timeslot color={this.state.shifts[61].color} />
            <Timeslot color={this.state.shifts[62].color} />

            <div class="item-hours">9am</div>
            <Timeslot color={this.state.shifts[63].color} />
            <Timeslot color={this.state.shifts[64].color} />
            <Timeslot color={this.state.shifts[65].color} />
            <Timeslot color={this.state.shifts[66].color} />
            <Timeslot color={this.state.shifts[67].color} />
            <Timeslot color={this.state.shifts[68].color} />
            <Timeslot color={this.state.shifts[69].color} />

            <div class="item-hours">10am</div>
            <Timeslot color={this.state.shifts[70].color} />
            <Timeslot color={this.state.shifts[71].color} />
            <Timeslot color={this.state.shifts[72].color} />
            <Timeslot color={this.state.shifts[73].color} />
            <Timeslot color={this.state.shifts[74].color} />
            <Timeslot color={this.state.shifts[75].color} />
            <Timeslot color={this.state.shifts[76].color} />

            <div class="item-hours">11am</div>
            <Timeslot color={this.state.shifts[77].color} />
            <Timeslot color={this.state.shifts[78].color} />
            <Timeslot color={this.state.shifts[79].color} />
            <Timeslot color={this.state.shifts[80].color} />
            <Timeslot color={this.state.shifts[81].color} />
            <Timeslot color={this.state.shifts[82].color} />
            <Timeslot color={this.state.shifts[83].color} />

            <div class="item-hours">12pm</div>
            <Timeslot color={this.state.shifts[84].color} />
            <Timeslot color={this.state.shifts[85].color} />
            <Timeslot color={this.state.shifts[86].color} />
            <Timeslot color={this.state.shifts[87].color} />
            <Timeslot color={this.state.shifts[88].color} />
            <Timeslot color={this.state.shifts[89].color} />
            <Timeslot color={this.state.shifts[90].color} />

            <div class="item-hours">1pm</div>
            <Timeslot color={this.state.shifts[91].color} />
            <Timeslot color={this.state.shifts[92].color} />
            <Timeslot color={this.state.shifts[93].color} />
            <Timeslot color={this.state.shifts[94].color} />
            <Timeslot color={this.state.shifts[95].color} />
            <Timeslot color={this.state.shifts[96].color} />
            <Timeslot color={this.state.shifts[97].color} />

            <div class="item-hours">2pm</div>
            <Timeslot color={this.state.shifts[98].color} />
            <Timeslot color={this.state.shifts[99].color} />
            <Timeslot color={this.state.shifts[100].color} />
            <Timeslot color={this.state.shifts[101].color} />
            <Timeslot color={this.state.shifts[102].color} />
            <Timeslot color={this.state.shifts[103].color} />
            <Timeslot color={this.state.shifts[104].color} />

            <div class="item-hours">3pm</div>
            <Timeslot color={this.state.shifts[105].color} />
            <Timeslot color={this.state.shifts[106].color} />
            <Timeslot color={this.state.shifts[107].color} />
            <Timeslot color={this.state.shifts[108].color} />
            <Timeslot color={this.state.shifts[109].color} />
            <Timeslot color={this.state.shifts[110].color} />
            <Timeslot color={this.state.shifts[111].color} />

            <div class="item-hours">4pm</div>
            <Timeslot color={this.state.shifts[112].color} />
            <Timeslot color={this.state.shifts[113].color} />
            <Timeslot color={this.state.shifts[114].color} />
            <Timeslot color={this.state.shifts[115].color} />
            <Timeslot color={this.state.shifts[116].color} />
            <Timeslot color={this.state.shifts[117].color} />
            <Timeslot color={this.state.shifts[118].color} />

            <div class="item-hours">5pm</div>
            <Timeslot color={this.state.shifts[119].color} />
            <Timeslot color={this.state.shifts[120].color} />
            <Timeslot color={this.state.shifts[121].color} />
            <Timeslot color={this.state.shifts[122].color} />
            <Timeslot color={this.state.shifts[123].color} />
            <Timeslot color={this.state.shifts[124].color} />
            <Timeslot color={this.state.shifts[125].color} />

            <div class="item-hours">6pm</div>
            <Timeslot color={this.state.shifts[126].color} />
            <Timeslot color={this.state.shifts[127].color} />
            <Timeslot color={this.state.shifts[128].color} />
            <Timeslot color={this.state.shifts[129].color} />
            <Timeslot color={this.state.shifts[130].color} />
            <Timeslot color={this.state.shifts[131].color} />
            <Timeslot color={this.state.shifts[132].color} />

            <div class="item-hours">7pm</div>
            <Timeslot color={this.state.shifts[133].color} />
            <Timeslot color={this.state.shifts[134].color} />
            <Timeslot color={this.state.shifts[135].color} />
            <Timeslot color={this.state.shifts[136].color} />
            <Timeslot color={this.state.shifts[137].color} />
            <Timeslot color={this.state.shifts[138].color} />
            <Timeslot color={this.state.shifts[139].color} />

            <div class="item-hours">8pm</div>
            <Timeslot color={this.state.shifts[140].color} />
            <Timeslot color={this.state.shifts[141].color} />
            <Timeslot color={this.state.shifts[142].color} />
            <Timeslot color={this.state.shifts[143].color} />
            <Timeslot color={this.state.shifts[144].color} />
            <Timeslot color={this.state.shifts[145].color} />
            <Timeslot color={this.state.shifts[146].color} />

            <div class="item-hours">9pm</div>
            <Timeslot color={this.state.shifts[147].color} />
            <Timeslot color={this.state.shifts[148].color} />
            <Timeslot color={this.state.shifts[149].color} />
            <Timeslot color={this.state.shifts[150].color} />
            <Timeslot color={this.state.shifts[151].color} />
            <Timeslot color={this.state.shifts[152].color} />
            <Timeslot color={this.state.shifts[153].color} />

            <div class="item-hours">10pm</div>
            <Timeslot color={this.state.shifts[154].color} />
            <Timeslot color={this.state.shifts[155].color} />
            <Timeslot color={this.state.shifts[156].color} />
            <Timeslot color={this.state.shifts[157].color} />
            <Timeslot color={this.state.shifts[158].color} />
            <Timeslot color={this.state.shifts[159].color} />
            <Timeslot color={this.state.shifts[160].color} />

            <div class="item-hours">11pm</div>
            <Timeslot color={this.state.shifts[161].color} />
            <Timeslot color={this.state.shifts[162].color} />
            <Timeslot color={this.state.shifts[163].color} />
            <Timeslot color={this.state.shifts[164].color} />
            <Timeslot color={this.state.shifts[165].color} />
            <Timeslot color={this.state.shifts[166].color} />
            <Timeslot color={this.state.shifts[167].color} />
          </div>
        </div>
      </div>
    );
  }
}
