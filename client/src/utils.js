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

function getBlankSchedule() {
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
        schedule[library][abbrev][t] = [];
      }
    }
  }

  return schedule;
}

export { abbrevs, revAbbrevs, days, libraries, getBlankSchedule, modalStyles };
