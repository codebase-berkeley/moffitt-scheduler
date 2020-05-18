constants = {
  minEmployeesMoffitt3: 2,
  minEmployeesMoffitt4: 2,
  minEmployeesDoe: 3,
  minShiftLength: 2,
  maxShiftLength: 8,
  maxWeeklyShifts: 10,
  moffitt3Hours: [
    { day: "sun", start: 13, end: 16, location: "Moffitt 3" },
    { day: "mon", start: 10, end: 14, location: "Moffitt 3" },
    { day: "tue", start: 10, end: 14, location: "Moffitt 3" },
  ],
  moffitt4Hours: [
    { day: "sun", start: 13, end: 16, location: "Moffitt 4" },
    { day: "mon", start: 10, end: 14, location: "Moffitt 4" },
    { day: "tue", start: 10, end: 14, location: "Moffitt 4" },
  ],
  doeHours: [
    { day: "sun", start: 14, end: 17, location: "Doe" },
    { day: "mon", start: 9, end: 13, location: "Doe" },
    { day: "tue", start: 9, end: 12, location: "Doe" },
  ],
};
module.exports = constants;
