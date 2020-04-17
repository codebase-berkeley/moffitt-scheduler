constants = {
  minEmployeesMoffitt3: 2,
  minEmployeesMain: 3,
  minShiftLength: 2,
  maxShiftLength: 8,
  moffitt3Hours: [
    { day: "sun", start: 13, end: 16, location: "Moffitt 3" },
    { day: "mon", start: 10, end: 14, location: "Moffitt 3" },
    { day: "tue", start: 10, end: 14, location: "Moffitt 3" },
  ],
  mainHours: [
    { day: "sun", start: 14, end: 17, location: "Main" },
    { day: "mon", start: 9, end: 13, location: "Main" },
    { day: "tue", start: 9, end: 12, location: "Main" },
  ],
};

module.exports = constants;
