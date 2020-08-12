var dayToAbbrevs = {
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

var abbrevToIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

var abbrevs = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

var libraries = ["moffitt3", "moffitt4", "main"];

var blankSchedule = {
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
  for (var d = 0; d < abbrevs.length; d++) {
    var day = abbrevs[d];
    for (t = 0; t < 24; t += 0.5) {
      blankSchedule[library][day][t] = [];
    }
  }
}

function getBlankSchedule() {
  return JSON.parse(JSON.stringify(blankSchedule));
}

module.exports = {
  dayToAbbrevs: dayToAbbrevs,
  revAbbrevs: revAbbrevs,
  days: days,
  abbrevToIndex: abbrevToIndex,
  abbrevs: abbrevs,
  libraries: libraries,
  getBlankSchedule: getBlankSchedule
};
