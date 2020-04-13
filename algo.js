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

var minEmployeesMoffitt3 = 2;
var minEmployeesMain = 3;

var minShiftLength = 2; // 1 hour because two half hour shifts is equal to one hour
var maxShiftLength = 8; // 4 hours
var maxWeeklyShifts = 10; // 5 hours
var maxHoleLength = 2; //1 hour

/** Data structure for each 30-minute shift
 */
class Shift {
  constructor(id, start, end, weekday, location) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.weekday = weekday;
    this.location = location;
    this.assignedSles = [];
  }

  /**Remove SLE from my assignedSles. */
  removeAssignSle(sle) {
    const index = this.assignedSles.indexOf(sle);
    if (index > -1) {
      this.assignedSles.splice(index, 1);
    }
  }
}

/** Data structure for each employee.
 *  availShifts keeps track of each 30min Shift object this Sle can be assigned to.
 *  availShifts will contain concurrent shifts at different locations
 */
class Sle {
  constructor(id, tMoffitt3, tMoffitt4, tMain, avails, shiftsLeft) {
    this.id = id;
    this.tMoffitt3 = tMoffitt3;
    this.tMoffitt4 = tMoffitt4;
    this.tMain = tMain;
    this.avails = avails;
    this.shiftsLeft = shiftsLeft;
    this.availShifts = [];
    this.availScore = 0;
    this.assignedShifts = [];
  }

  /** Change my availScore to be how many availShifts I have */
  updateScore() {
    this.availScore = this.availShifts.length;
  }

  /**Remove SHIFT from my availShifts. */
  removeAvailShift(shift) {
    const index = this.availShifts.indexOf(shift);
    if (index > -1) {
      this.availShifts.splice(index, 1);
    }
  }

  /**Remove SHIFT from my assignedShifts. */
  removeAssignShift(shift) {
    const index = this.assignedShifts.indexOf(shift);
    if (index > -1) {
      this.assignedShifts.splice(index, 1);
    }
  }

  /** Return a list of all shifts in allShifts that are concurrent with SHIFT.
   */
  concurrents(shift) {
    var concurrents = [];
    for (let i = 0; i < allShifts.length; i += 1) {
      if (
        allShifts[i].start == shift.start &&
        allShifts[i].end == shift.end &&
        allShifts[i].weekday == shift.weekday
      ) {
        concurrents.push(allShifts[i]);
      }
    }
    return concurrents;
  }
}

/** Initialize a list of all SLEs using the info from imported avails.
 */
/** Return a list of all 30min Shift objects using a list of libraries. */
function initShifts(libraries) {
  retShifts = [];
  for (let i = 0; i < libraries.length; i += 1) {
    library = libraries[i];
    for (let j = 0; j < library.length; j += 1) {
      currentDay = library[j];
      for (let s = currentDay.start; s < currentDay.end; s += 0.5) {
        newShift = new Shift(
          0,
          s,
          s + 0.5,
          currentDay.day,
          currentDay.location
        );
        retShifts.push(newShift);
      }
    }
  }
  for (let i = 0; i < retShifts.length; i += 1) {
    retShifts[i].id = i;
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
  for (let i = 0; i < retSLEs.length; i += 1) {
    retSLEs[i].updateScore();
  }
  return retSLEs;
}

allSles = initSles(avails);

/** Using the availShifts property of each Sle inside allSles,
 *  return a list of each Shift object in order of rarity.
 *  Index 0 would have the rarest shift.
 */
function rareShifts() {
  var shiftsDict = new Object();
  for (let i = 0; i < allSles.length; i += 1) {
    currentSle = allSles[i];
    for (let i = 0; i < currentSle.availShifts.length; i += 1) {
      if (currentSle.availShifts[i].id in shiftsDict) {
        shiftsDict[currentSle.availShifts[i].id] += 1;
      } else {
        shiftsDict[currentSle.availShifts[i].id] = 1;
      }
    }
  }
  var values = Object.values(shiftsDict);
  values.sort();
  sortedKeys = [];
  for (let i = 0; i < values.length; i += 1) {
    let value = values[i];
    let key = Object.keys(shiftsDict)[Object.values(shiftsDict).indexOf(value)];
    sortedKeys.push(key);
    delete shiftsDict[key];
  }
  sortedShifts = [];
  for (let i = 0; i < sortedKeys.length; i += 1) {
    for (let j = 0; j < allShifts.length; j += 1) {
      if (sortedKeys[i] == allShifts[j].id) {
        sortedShifts.push(allShifts[j]);
        break;
      }
    }
  }
  return sortedShifts;
}

orderedShifts = rareShifts();

/** Returns a shallow copy of allSles in order of ascending availScore. */
function orderSles() {
  let copy = [];
  for (let i = 0; i < allSles.length; i += 1) {
    copy.push(allSles[i]);
  }

  for (let i = 0; i < copy.length - 1; i += 1) {
    for (let j = 0; j < copy.length - 1 - i; j += 1) {
      if (copy[j].availScore > copy[j + 1].availScore) {
        let temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }
  return copy;
}

orderedSles = orderSles();

/** Loop through each SLE in allSles and assign each to a proper shift.
 *  Start the loop on the rarest shift. Keeping track of the first 30-minute interval,
 *  expand later, then earlier, then checking for holes. Ties are determined by SLE's availScore property;
 *  SLE's with lower availScores get priority for Shifts.
 *
 *  Uses a bunch of helper functions!
 */
function assignAllShifts() {
  for (let i = 0; i < orderedShifts.length; i += 1) {
    let currentShift = orderedShifts[i];
    for (let j = 0; j < orderedSles.length; j += 1) {
      let currentSle = orderedSles[j];
      if (valid(currentSle, currentShift)) {
        assignShift(currentSle, currentShift);

        let shiftsSoFar = 1;
        let shiftsSoFarArray = [currentShift];

        let nextShift = currentShift;
        while (
          checkNextShift(currentSle, nextShift) &&
          shiftsSoFar < maxShiftLength
        ) {
          nextShiftIndex = allShifts.indexOf(nextShift) + 1;
          nextShift = allShifts[nextShiftIndex];
          assignShift(currentSle, nextShift);
          shiftsSoFar += 1;
          shiftsSoFarArray.push(nextShift);
        }

        let previousShift = currentShift;
        while (
          checkPreviousShift(currentSle, previousShift) &&
          shiftsSoFar < maxShiftLength
        ) {
          previousShiftIndex = allShifts.indexOf(previousShift) - 1;
          previousShift = allShifts[previousShiftIndex];
          assignShift(currentSle, previousShift);
          shiftsSoFar += 1;
          shiftsSoFarArray.push(previousShift);
        }
        if (shiftsSoFar < minShiftLength) {
          for (k = 0; k < shiftsSoFarArray.length; k += 1) {
            unassignShift(currentSle, shiftsSoFarArray[k]);
          }
        }
      }
    }
  }
}

/** Assigns a half hour shift to an SLE. */
function assignShift(sle, shift) {
  if (valid(sle, shift)) {
    shift.assignedSles.push(sle);
    sle.shiftsLeft -= 1;
    sle.removeAvailShift(shift);
    sle.assignedShifts.push(shift);
  }
}

/** Unassign a half hour shift from an SLE. */
function unassignShift(sle, shift) {
  shift.removeAssignSle(sle);
  sle.shiftsLeft += 1;
  sle.removeAssignShift(shift);
  sle.availShifts.push(shift);
}

/** Check if this SLE/Shift assignment is valid using multiple helpers */
function valid(sle, shift) {
  /** Checks whether the SLE can work any more shifts this week. */
  function shiftsLeft(sle) {
    return sle.shiftsLeft != 0;
  }

  /** Checks whether the shift is full. */
  function locationFull(shift) {
    if (shift.location == "Moffitt 3") {
      return shift.assignedSles.length >= minEmployeesMoffitt3;
    } else if (shift.location == "Main") {
      return shift.assignedSles.length >= minEmployeesMain;
    }
  }

  /** Checks whether the SLE is already working another shift at the same time. */
  function workingConcurrent(sle, shift) {
    var concurrent = sle.concurrents(shift);
    for (let i = 0; i < concurrent.length; i += 1) {
      if (concurrent[i].assignedSles.includes(sle)) {
        return true;
      }
    }
    return false;
  }
  return (
    sle.availShifts.includes(shift) &&
    shiftsLeft(sle) &&
    !locationFull(shift) &&
    !workingConcurrent(sle, shift)
  );
}

/** Check whether you can expand into the next shift. */
function checkNextShift(sle, currentShift) {
  nextShiftIndex = allShifts.indexOf(currentShift) + 1;
  nextShift = allShifts[nextShiftIndex];
  if (
    nextShift != null &&
    currentShift.location == nextShift.location &&
    currentShift.weekday == nextShift.weekday &&
    valid(sle, nextShift)
  ) {
    return true;
  }
  return false;
}

/** Check whether you can expand into the previous shift. */
function checkPreviousShift(sle, currentShift) {
  previousShiftIndex = allShifts.indexOf(currentShift) - 1;
  previousShift = allShifts[previousShiftIndex];
  if (
    previousShift != null &&
    currentShift.location == previousShift.location &&
    currentShift.weekday == previousShift.weekday &&
    valid(sle, previousShift)
  ) {
    return true;
  }
  return false;
}

assignAllShifts();

// Testing output
// for (let i = 0; i < allShifts.length; i += 1) {
//   console.log(
//     allShifts[i].location +
//       " " +
//       allShifts[i].weekday +
//       " " +
//       allShifts[i].start
//   );
//   for (let j = 0; j < allShifts[i].assignedSles.length; j++) {
//     console.log(allShifts[i].assignedSles[j].id);
//   }
// }

/** Make sure there's no holes for DAY at LOCATION */
function checkHoles(day, location) {}

// Your final output should be an object that looks like a row
// in the shifts table. So an array of objects that looks like this:
// shifts = [
//   {
//     sle_id: 1,
//     day_of_week: "sun",
//     location: "Moffitt 3",
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

class finalOutput {
  constructor(sle_id, day_of_week, location, start_time, end_time) {
    this.sle_id = sle_id;
    this.day_of_week = day_of_week;
    this.location = location;
    this.start_time = start_time;
    this.end_time = end_time;
    this.coverrequested = false;
  }
}

function initFinalOutput() {
  retFinalOutput = [];
  for (i = 0; i < allSles.length; i += 1) {
    currentSle = allSles[i];
    sle_id = currentSle.id;
    for (j = 0; j < currentSle.assignedShifts.length; j += 1) {
      currentShift = currentSle.assignedShifts[j];
      day_of_week = currentShift.weekday;
      location = currentShift.location;
      start_time = currentShift.start;
      end_time = currentShift.end;
      newFinalOutput = new finalOutput(
        sle_id,
        day_of_week,
        location,
        start_time,
        end_time
      );
      retFinalOutput.push(newFinalOutput);
    }
  }
  return retFinalOutput;
}

console.log(initFinalOutput());
