var abbrevs = {
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
  Saturday: "sat",
  Sunday: "sun"
};

var revAbbrevs = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday"
};

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var pAbbrevs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var libraries = ["moffitt3", "moffitt4", "main"];

var modalStyles = {
  content: {
    position: "absolute",
    top: "150px",
    left: "40%",
    width: "400px",
    height: "200px",
    transform: "translate(-50%, -50%)",
    paddingLeft: "5px",
    backgroundColor: "white",
    overflow: 0
  }
};

var abbrevToIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

function getBlankSchedule(blank) {
  var schedule = {
    moffitt3: {
      sun: {},
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {}
    },
    moffitt4: {
      sun: {},
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {}
    },
    main: {
      sun: {},
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {}
    }
  };
  for (var l = 0; l < libraries.length; l++) {
    var library = libraries[l];
    for (var d = 0; d < days.length; d++) {
      var abbrev = abbrevs[days[d]];
      for (var t = 0; t < 24; t += 0.5) {
        schedule[library][abbrev][t] = blank;
      }
    }
  }
  return schedule;
}

function getBlankSleSchedule(blank) {
  var schedule = {
    sun: {},
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
    sat: {}
  };

  for (var d = 0; d < days.length; d++) {
    var abbrev = abbrevs[days[d]];
    for (var t = 0; t < 24; t += 0.5) {
      schedule[abbrev][t] = blank;
    }
  }

  return schedule;
}

function getStartOfWeek() {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  return startOfWeek;
}

function timeToString(time) {
  if (time == null) {
    return "";
  }

  var period = "AM";
  if (time >= 12) {
    period = "PM";
  }

  if (time >= 13) {
    time -= 12;
  }

  if (time === 0 || time === 0.5) {
    time += 12;
  }

  var minutes = "30";
  var hour = Math.floor(time);
  if (hour === time) {
    minutes = "00";
  }

  return hour + ":" + minutes + " " + period;
}

function getDatePlusX(date, x) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + x);
  return newDate;
}

function shortDate(date) {
  if (date == null) {
    return "";
  }
  return date.getMonth() + 1 + "/" + date.getDate();
}

function longDate(date) {
  if (date == null) {
    return "";
  }

  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

function locToString(location) {
  if (location === "moffitt3") {
    return "Moffitt 3rd";
  } else if (location === "moffitt4") {
    return "Moffitt 4th";
  } else if (location === "main") {
    return "Main Stacks";
  }
}

export {
  abbrevs,
  revAbbrevs,
  days,
  libraries,
  getBlankSchedule,
  getBlankSleSchedule,
  modalStyles,
  abbrevToIndex,
  months,
  getStartOfWeek,
  timeToString,
  getDatePlusX,
  shortDate,
  longDate,
  locToString,
  pAbbrevs
};
