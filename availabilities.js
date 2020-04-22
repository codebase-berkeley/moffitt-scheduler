// Helper function to generate the employee availabilities
function gen(day, start, end) {
  avails = [];
  for (var t = start; t <= end - 0.5; t += 0.5) {
    avails.push({ day: day, slot: t });
  }

  return avails;
}

// Employee Counts:
// Sun 13-17
// 2 employees from 13-14
// 5 employees from 14-16
// 3 employees from 16-17

// Mon 9-14
// 3 employees from 9-10
// 5 employees from 10-13
// 2 employees from 13-14

// Tue 9-14
// 3 employees from 9-10
// 5 employees from 10-12
// 2 employees from 12-14

// The 13-14 block only has 2 people so it should be assigned first.

// Free from Sun 13-15
e1 = {
  id: 1,
  tMoffitt3: true,
  tMoffitt4: true,
  tMain: true,
  avails: [
    { day: "sun", slot: 13 },
    { day: "sun", slot: 13.5 },
    { day: "sun", slot: 14 },
    { day: "sun", slot: 14.5 },
  ],
};

// Free from Sun 13-17
e2 = {
  id: 2,
  tMoffitt3: true, //changed from false to true to test
  tMoffitt4: true,
  tMain: true,
  avails: [
    { day: "sun", slot: 13 },
    { day: "sun", slot: 13.5 },
    { day: "sun", slot: 14 },
    { day: "sun", slot: 14.5 },
    { day: "sun", slot: 15 },
    { day: "sun", slot: 15.5 },
    { day: "sun", slot: 16 },
    { day: "sun", slot: 16.5 },
  ],
};

// Sun 14-17
// Mon 9-14
// e3 = {
//   id: 3,
//   tMoffitt3: false,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 14-17
// // Mon 9-14
// e4 = {
//   id: 4,
//   tMoffitt3: false,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 14-17
// // Mon 9-14
// e5 = {
//   id: 5,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 14-17
// // Mon 9-14
// e6 = {
//   id: 6,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 14-17
// // Mon 9-14
// e7 = {
//   id: 7,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 14-17
// // Mon 9-14
// e7 = {
//   id: 7,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 14 },
//     { day: "sun", slot: 14.5 },
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "mon", slot: 12.5 },
//     { day: "mon", slot: 13 },
//     { day: "mon", slot: 13.5 },
//   ],
// };

// // Sun 15-17
// // Mon 9-12:30
// // Tue 9-12
// e8 = {
//   id: 8,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "tue", slot: 9 },
//     { day: "tue", slot: 9.5 },
//     { day: "tue", slot: 10 },
//     { day: "tue", slot: 10.5 },
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//   ],
// };

// // Sun 15-17
// // Mon 9-12:30
// // Tue 9-12
// e9 = {
//   id: 9,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "tue", slot: 9 },
//     { day: "tue", slot: 9.5 },
//     { day: "tue", slot: 10 },
//     { day: "tue", slot: 10.5 },
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//   ],
// };

// // Sun 15-17
// // Mon 9-12:30
// // Tue 9-12
// e10 = {
//   id: 10,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "tue", slot: 9 },
//     { day: "tue", slot: 9.5 },
//     { day: "tue", slot: 10 },
//     { day: "tue", slot: 10.5 },
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//   ],
// };

// // Sun 15-17
// // Mon 9-12:30
// // Tue 9-12
// e11 = {
//   id: 11,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "tue", slot: 9 },
//     { day: "tue", slot: 9.5 },
//     { day: "tue", slot: 10 },
//     { day: "tue", slot: 10.5 },
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//   ],
// };

// // Sun 15-17
// // Mon 9-12:30
// // Tue 9-12
// e12 = {
//   id: 12,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "sun", slot: 15 },
//     { day: "sun", slot: 15.5 },
//     { day: "sun", slot: 16 },
//     { day: "sun", slot: 16.5 },
//     { day: "mon", slot: 9 },
//     { day: "mon", slot: 9.5 },
//     { day: "mon", slot: 10 },
//     { day: "mon", slot: 10.5 },
//     { day: "mon", slot: 11 },
//     { day: "mon", slot: 11.5 },
//     { day: "mon", slot: 12 },
//     { day: "tue", slot: 9 },
//     { day: "tue", slot: 9.5 },
//     { day: "tue", slot: 10 },
//     { day: "tue", slot: 10.5 },
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//   ],
// };

// // Tue 11-14
// /*e12 = {
//   id: 12,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };*/

// // Tue 11-14
// e13 = {
//   id: 13,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

// // Tue 11-14
// e14 = {
//   id: 14,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

// // Tue 11-14
// e15 = {
//   id: 15,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

// // Tue 11-14
// e16 = {
//   id: 16,
//   tMoffitt3: true,
//   tMoffitt4: true,
//   tMain: false,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

// // Tue 11-14
// e17 = {
//   id: 17,
//   tMoffitt3: false,
//   tMoffitt4: false,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

// // Tue 11-14
// e18 = {
//   id: 18,
//   tMoffitt3: false,
//   tMoffitt4: false,
//   tMain: true,
//   avails: [
//     { day: "tue", slot: 11 },
//     { day: "tue", slot: 11.5 },
//     { day: "tue", slot: 12 },
//     { day: "tue", slot: 12.5 },
//     { day: "tue", slot: 13 },
//     { day: "tue", slot: 13.5 },
//   ],
// };

module.exports = [
  e1,
  e2,
  // e3,
  // e4,
  // e5,
  // e6,
  // e7,
  // e8,
  // e9,
  // e10,
  // e11,
  // e12,
  // e13,
  // e14,
  // e15,
  // e16,
  // e17,
  // e18,
];
