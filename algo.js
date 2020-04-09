var avails = require("./availabilities");

// The way to interpret these is like they're rows in the a table
// [weekday, starttime, endtime] with times being in military time
// (so 15 = 3pm). I intentionally made the times smaller than the actual
// hours for Moffitt and Doe so it is easier to reason about. You may
// want to make the problem even smaller when you're starting out
// (i.e only schedule one day) to make it easier to get started.
var moffitt3Hours = [
  { day: "sun", start: 13, end: 16 },
  { day: "mon", start: 10, end: 14 },
  { day: "tue", start: 10, end: 14 },
];

var mainHours = [
  { day: "sun", start: 14, end: 17 },
  { day: "mon", start: 9, end: 13 },
  { day: "tue", start: 9, end: 12 },
];

// In my opinion the first step is to covert those arrays
// into an array of half hour timeslots that need to be scheduled.

var minEmployeesMoffitt3 = 2;
var minEmployeesMain = 3;

var minShiftLength = 2; // 1 hour because two half hour shifts is equal to one hour
var maxShiftLength = 8; // 4 hours
var maxWeeklyShifts = 10; // 5 hours
var maxHoleLength = 2; //1 hour

/** Data structure for each 30-minute shift
 */
class Shift {
  constructor(start, end, weekday, location, availSles, assignSles) {
    this.start = start;
    this.end = end;
    this.weekday = weekday;
    this.location = location;
    this.availSles = availSles;
    this.assignSles = assignSles;
  }
}

/** Data structure for each employee
 */
class Sle {
  constructor(id, tMoffitt3, tMoffitt4, tMain, avails, hoursLeft) {
    this.id = id;
    this.tMoffitt3 = tMoffitt3;
    this.tMoffitt4 = tMoffitt4;
    this.tMain = tMain;
    this.avails = avails;
    this.hoursLeft = hoursLeft;
  }
}

/** Initialize a list of all SLEs using the info from imported avails.
 */
function initSles(availInfo) {
  return 1; //FIXME;
}

console.log(avails);

var allSles = initSles(avails);

function initShifts() {}

// Next you need to count how many people can work
// each of those half hour time slots

// Then start making assignments and keep track of how much/when
// people are working

// Your final output should be an object that looks like a row
// in the shifts table. So an array of objects that looks like this:
// shifts = [
//   {
//     sle_id: 1,
//     day_of_week: "sun",
//     location: "Moffit 3",
//     start_time: "5:00",
//     end_time: "8:00",
//     coverrequested: false
//   },
//   {
//     sle_id: 2,
//     day_of_week: "mon",
//     location: "Doe",
//     start_time: "10:00",
//     end_time: "12:00",
//     coverrequested: false
//   }
// ];
