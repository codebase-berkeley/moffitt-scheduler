var express = require("express");
var router = express.Router();
var config = require("./config");
var pool = require("../db/db");

router.get("/masterschedule", function (req, res) {
  function getWeekNumber(d) {
    //Copied from stackoverflow
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - d.getUTCDay());
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }
  function sameWeekAsCurrent(date) {
    var currentDay = new Date();
    if (
      getWeekNumber(date) == getWeekNumber(currentDay) &&
      date.getYear() == currentDay.getYear()
    ) {
      return true;
    } else {
      return false;
    }
  }
  pool.query(
    "SELECT name, start_time, end_time, location, shift_id, sle_id FROM shifts, sle WHERE id=sle_id ",
    (error, result) => {
      if (error) {
        throw error;
      }
      for (let i = 0; i < result.rows.length; i += 1) {
        //some shifts will cover more than one week (saturday night through sunday morning)
        //in these cases, set the not-in-week start_time or end_time to be 12AM or 11:59PM of the in-week time, respectively
        if (
          !sameWeekAsCurrent(result.rows[i].start_time) &&
          !sameWeekAsCurrent(result.rows[i].end_time)
        ) {
          result.rows[i] = null;
        } else if (
          sameWeekAsCurrent(result.rows[i].start_time) &&
          !sameWeekAsCurrent(result.rows[i].end_time)
        ) {
          result.rows[i].end_time.setHours(0, 0, 0, 0);
        } else if (
          !sameWeekAsCurrent(result.rows[i].start_time) &&
          sameWeekAsCurrent(result.rows[i].end_time)
        ) {
          result.rows[i].start_time = new Date(result.rows[i].end_time);
          result.rows[i].start_time.setHours(0, 0, 0, 0);
        }
      }
      var resultInWeek = [];
      for (let i = 0; i < result.rows.length; i += 1) {
        if (result.rows[i] != null) {
          resultInWeek.push(result.rows[i]);
        }
      }
      return res.json({ items: resultInWeek });
    }
  );
});

router.get("/otheremployees", function (req, res) {
  pool.query("SELECT name, id FROM sle", (error, result) => {
    if (error) {
      throw error;
    }
    return res.json({ allEmployees: result.rows });
  });
});

router.post("/addemployee", (req, res) => {
  var sleId = parseInt(req.body.sleId);
  var currHour = parseInt(req.body.currHour);
  var currDate = new Date(req.body.currDate);
  var loc = req.body.loc;

  var endTime = new Date(currDate);
  endTime.setHours(currHour + 1, 0, 0, 0);

  pool.query(
    `INSERT INTO shifts (sle_id, location, start_time, end_time) 
    VALUES (${sleId}, '${loc}', to_timestamp(${currDate.getTime()} / 1000.0), to_timestamp(${endTime.getTime()} / 1000.0)) 
    RETURNING shift_id`,
    [],
    (error, result) => {
      if (error) {
        throw error;
      }
      var newShiftId = result.rows[0]["shift_id"];
      return res.json({ id: newShiftId });
    }
  );
});

router.post("/removeemployee", (req, res) => {
  var shiftId = parseInt(req.body.shiftId);
  var sleId = parseInt(req.body.sleId);
  var currHour = parseInt(req.body.currHour);

  pool.query(
    "SELECT start_time, end_time, location FROM shifts WHERE shift_id = $1",
    [shiftId],
    (error, result) => {
      if (error) {
        throw error;
      }
      var startTimeObj = result.rows[0]["start_time"];
      var endTimeObj = result.rows[0]["end_time"];

      var startTime = startTimeObj.getHours();
      var endTime = endTimeObj.getHours();

      var loc = result.rows[0]["location"];

      var currTimeObj = new Date(startTimeObj.getTime());
      currTimeObj.setHours(currHour, 0, 0, 0);

      if (currHour != startTime) {
        //overnight
        if (currHour < startTime) {
          currTimeObj = new Date(endTimeObj.getTime());
          currTimeObj.setHours(currHour, 0, 0, 0);
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${startTimeObj.getTime()} / 1000.0), to_timestamp(${currTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //non-overnight
        else {
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${startTimeObj.getTime()} / 1000.0), to_timestamp(${currTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
      var endCurrHour = (currHour + 1) % 24;
      var endCurrTimeObj = new Date(startTimeObj.getTime());
      endCurrTimeObj.setHours(endCurrHour, 0, 0, 0);

      if (endCurrHour != endTime) {
        //non-overnight
        if (endCurrHour < endTime) {
          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${endCurrTimeObj.getTime()} / 1000.0), to_timestamp(${endTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        } //overnight
        else {
          endCurrTimeObj = new Date(endTimeObj.getTime());
          endCurrTimeObj.setHours(endCurrHour, 0, 0, 0);

          pool.query(
            `INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES (${sleId}, '${loc}', to_timestamp(${endCurrTimeObj.getTime()} / 1000.0), to_timestamp(${endTimeObj.getTime()} / 1000.0))`,
            (error, result) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
    }
  );

  pool.query(
    "DELETE FROM shifts WHERE shift_id = $1",
    [shiftId],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  return res.json({});
});

router.post("/generateshifts", (req, res) => {
  var startDate = new Date(req.body.startDate);
  var endDate = new Date(req.body.endDate);
  var weekdayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  pool.query(
    "SELECT * FROM SCHEDULE ORDER BY sle_id, start_time",
    (error, result) => {
      if (error) {
        throw error;
      }
      var shiftGroups = [];
      var duplicateTracker = [];
      for (let i = 0; i < result.rows.length; i += 1) {
        let currRow = result.rows[i];
        let dup = false;
        for (let j = 0; j < duplicateTracker.length; j += 1) {
          if (
            currRow.sle_id == duplicateTracker[j].sle_id &&
            currRow.day_of_week == duplicateTracker[j].day_of_week &&
            currRow.location == duplicateTracker[j].location &&
            currRow.start_time == duplicateTracker[j].start_time
          ) {
            dup = true;
          }
        }
        if (!dup) {
          duplicateTracker.push(currRow);
          let newgroup = null;
          for (let j = 0; j < shiftGroups.length; j += 1) {
            if (
              shiftGroups[j].sle_id == currRow.sle_id &&
              shiftGroups[j].loc == currRow.location &&
              currRow.end_time == shiftGroups[j].e + 0.5
            ) {
              newgroup = shiftGroups[j];
            }
          }
          if (newgroup == null) {
            shiftGroups.push({
              sle_id: currRow.sle_id,
              loc: currRow.location,
              s: currRow.start_time,
              e: currRow.end_time,
              day: currRow.day_of_week,
            });
          } else {
            newgroup.e += 0.5;
          }
        }
      }
      console.log(shiftGroups);
      var realShifts = [];
      while (
        startDate.getDate() <= endDate.getDate() + 1 ||
        startDate.getMonth() != endDate.getMonth()
      ) {
        for (let i = 0; i < shiftGroups.length; i += 1) {
          if (shiftGroups[i].day == weekdayMap[startDate.getDay()]) {
            let next = {
              sle_id: shiftGroups[i].sle_id,
              location: shiftGroups[i].loc,
              start_time: new Date(startDate),
              end_time: new Date(startDate),
            };
            if (shiftGroups[i].s % 1 == 0) {
              next.start_time.setHours(shiftGroups[i].s);
            } else {
              next.start_time.setHours(shiftGroups[i].s, 30);
            }
            if (shiftGroups[i].e % 1 == 0) {
              next.end_time.setHours(shiftGroups[i].e);
            } else {
              next.end_time.setHours(shiftGroups[i].e, 30);
            }
            realShifts.push(next);
          }
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      pool.query("DELETE FROM SHIFTS");
      insertShifts(realShifts);
      return res.json({ items: realShifts });
    }
  );
});

async function insertShifts(realShifts) {
  for (let i = 0; i < realShifts.length; i += 1) {
    var test = await pool.query(
      "INSERT INTO shifts (sle_id, location, start_time, end_time) VALUES ($1, $2, $3, $4)",
      [
        realShifts[i].sle_id,
        realShifts[i].location,
        realShifts[i].start_time,
        realShifts[i].end_time,
      ]
    );
  }
}

var moffitt3Hours = config.moffitt3Hours;
var mainHours = config.mainHours;
var minEmployeesMoffitt3 = config.minEmployeesMoffitt3;
var minEmployeesMain = config.minEmployeesMain;
var minShiftLength = config.minShiftLength;
var maxShiftLength = config.maxShiftLength;
var maxWeeklyShifts = config.maxWeeklyShifts;

router.get("/generatesched", function (req, res) {
  pool.query(
    "SELECT * from AVAILABILITY inner join SLE on AVAILABILITY.sle_id = SLE.id",
    (error, result) => {
      if (error) {
        throw error;
      }
      var employeeList = [];
      var weekdayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      for (let i = 0; i < result.rows.length; i += 1) {
        let idExists = false;
        let currEmployee = null;
        for (let j = 0; j < employeeList.length; j += 1) {
          if (employeeList[j].id == result.rows[i].id) {
            idExists = true;
            currEmployee = employeeList[j];
            break;
          }
        }
        //ASSUMING AVAILABILITY TABLE START_TIME = 30MIN SHIFTS
        if (idExists) {
          currEmployee.avails.push({
            day: weekdayMap[result.rows[i].day_of_week],
            slot: result.rows[i].start_time,
          });
        } else {
          employeeList.push({
            id: result.rows[i].id,
            tMoffitt3: result.rows[i].training_level_moffitt,
            tMoffitt4: null, //NOT IN DATABASE ?
            tMain: result.rows[i].training_level_doe,
            avails: [
              {
                day: weekdayMap[result.rows[i].day_of_week],
                slot: result.rows[i].start_time,
              },
            ],
          });
        }
      }
      pool.query("DELETE FROM Schedule");

      var algoSchedule = finalSchedule(employeeList);
      insertSchedule(algoSchedule);
      return res.json({ items: algoSchedule });
    }
  );
});

async function insertSchedule(algoSchedule) {
  for (let i = 0; i < algoSchedule.length; i += 1) {
    let current = algoSchedule[i];
    var test = await pool.query(
      "INSERT INTO Schedule VALUES ($1, $2, $3, $4, $5, $6)",
      [
        current.sle_id,
        current.day_of_week,
        current.location,
        current.start_time,
        current.end_time,
        current.coverrequested,
      ]
    );
  }
}

/* Generate a list of objects representing the final schedule */
function finalSchedule(employeeList) {
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
            trained = currentSle.tMoffitt3 > 0;
            break;
          case "Moffitt 4":
            trained = currentSle.tMoffitt4 > 0;
            break;
          case "Main":
            trained = currentSle.tMain > 0;
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
  allSles = initSles(employeeList);
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
      let key = Object.keys(shiftsDict)[
        Object.values(shiftsDict).indexOf(value)
      ];
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
  assignAllShifts();
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

module.exports = router;
