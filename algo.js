var avails = require("./availabilities");

// The way to interpret these is like they're rows in the a table
// [weekday, starttime, endtime] with times being in military time
// (so 15 = 3pm). I intentionally made the times smaller than the actual
// hours for Moffitt and Doe so it is easier to reason about. You may
// want to make the problem even smaller when you're starting out
// (i.e only schedule one day) to make it easier to get started.
var moffitt3Hours = [
  { day: "sun", start: 13, end: 16, location: "Moffitt 3" },
  { day: "mon", start: 10, end: 14, location: "Moffitt 3" },
  { day: "tue", start: 10, end: 14, location: "Moffitt 3" },
];

var mainHours = [
  { day: "sun", start: 14, end: 17, location: "Main" },
  { day: "mon", start: 9, end: 13, location: "Main" },
  { day: "tue", start: 9, end: 12, location: "Main" },
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
  constructor(start, end, weekday, location) {
    this.start = start;
    this.end = end;
    this.weekday = weekday;
    this.location = location;
    this.assignSles = [];
  }
}

/** Data structure for each employee.
 *  availShifts keeps track of each 30min Shift object this Sle can be assigned to.
 *  availShifts will contain concurrent shifts at different locations
 */
class Sle {
  constructor(id, tMoffitt3, tMoffitt4, tMain, avails, hoursLeft) {
    this.id = id;
    this.tMoffitt3 = tMoffitt3;
    this.tMoffitt4 = tMoffitt4;
    this.tMain = tMain;
    this.avails = avails;
    this.hoursLeft = hoursLeft;
    this.availShifts = [];
  }
}

/** Return a list of all 30min Shift objects using a list of libraries. */
function initShifts(libraries) {
  retShifts = [];
  for (let i = 0; i < libraries.length; i += 1) {
    library = libraries[i];
    for (let j = 0; j < library.length; j += 1) {
      currentDay = library[j];
      for (let s = currentDay.start; s < currentDay.end; s += 0.5) {
        newShift = new Shift(s, s + 0.5, currentDay.day, currentDay.location);
        retShifts.push(newShift);
      }
    }
  }
  return retShifts;
}

allShifts = initShifts([mainHours, moffitt3Hours]);

/** Initialize a list of all SLEs using the info from imported avails. */
function initSles(availInfo) {
  var retSLEs = [];
  for (let k in availInfo) {
    const sleJSON = JSON.stringify(availInfo[k]);
    var sleObj = JSON.parse(sleJSON);
    var individualSle = new Sle(
      sleObj.id,
      sleObj.tMoffitt3,
      sleObj.tMoffitt4,
      sleObj.tMain,
      sleObj.avails,
      maxWeeklyShifts
    );
    retSLEs.push(individualSle);
  }
  for (let i = 0; i < retSLEs.length; i += 1) {
    currentSle = retSLEs[i];
    for (let j = 0; j < allShifts.length; j += 1) {
      currentShift = allShifts[j];
      switch (currentShift.location) {
        case "Moffitt 3":
          trained = currentSle.tMoffitt3;
          break;
        case "Moffitt 4":
          trained = currentSle.tMoffitt4;
          break;
        case "Main":
          trained = currentSle.tMain;
          break;
      }
      if (trained) {
        for (let k = 0; k < currentSle.avails.length; k += 1) {
          if (
            currentSle.avails[k].day == currentShift.weekday &&
            currentSle.avails[k].slot == currentShift.start
          ) {
            currentSle.availShifts.push(currentShift);
          }
        }
      }
    }
  }
  return retSLEs;
}

allSles = initSles(avails);

/** Using the availShifts property of each Sle inside allSles,
 *  return a list of each Shift object in order of rarity.
 *  Index 0 would have the rarest shift.
 */
function rareShifts() {
  return []; //FIXME
}

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
