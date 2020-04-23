psql postgres
drop database moffitt;
create database moffitt;
\q
psql moffitt < moffitt.sql

delete from availability;

-- insert the following avails into the availability table
-- e1 = {
--   id: 1,
--   tMoffitt3: true,
--   tMoffitt4: true,
--   tMain: true,
--   avails: [
--     { day: "sun", slot: 13 },
--     { day: "sun", slot: 13.5 },
--     { day: "sun", slot: 14 },
--     { day: "sun", slot: 14.5 },
--   ],
-- };

-- // Free from Sun 13-17
-- e2 = {
--   id: 2,
--   tMoffitt3: false,
--   tMoffitt4: true,
--   tMain: true,
--   avails: [
--     { day: "sun", slot: 13 },
--     { day: "sun", slot: 13.5 },
--     { day: "sun", slot: 14 },
--     { day: "sun", slot: 14.5 },
--     { day: "sun", slot: 15 },
--     { day: "sun", slot: 15.5 },
--     { day: "sun", slot: 16 },
--     { day: "sun", slot: 16.5 },
--   ],
-- };

INSERT INTO availability (
    availability_id,
    sle_id,
    start_time,
    day_of_week
)
VALUES
    (1, 1, 13, 0),
    (2, 1, 13.5, 0),
    (3, 1, 14, 0),
    (4, 1, 14.5, 0),
    (5, 2, 13, 0),
    (6, 2, 13.5, 0),
    (7, 2, 14, 0),
    (8, 2, 14.5, 0),
    (9, 2, 15, 0),
    (10, 2, 15.5, 0),
    (11, 2, 16, 0),
    (12, 2, 16.5, 0);

/** This query tests that master schedule correctly displays shifts within the current week. */
INSERT INTO shifts (
    sle_id, location, start_time, end_time
)
VALUES 
    (1, 'Moffitt', '2020-04-21 10:00:00', '2020-04-21 12:00:00'),
    (2, 'Moffitt', '2020-04-24 05:00:00', '2020-04-24 09:00:00'),
    (2, 'Doe', '2020-04-23 16:00:00', '2020-04-23 17:30:00'),
    (1, 'Moffitt', '2020-04-18 22:00:00', '2020-04-19 02:00:00'),
    (3, 'Doe', '2020-04-25 21:00:00', '2020-04-26 01:00:00'),
    (3, 'Doe', '2020-04-22 20:00:00', '2020-04-23 00:00:00'), 
    (1, 'Doe', '2020-04-23 23:00:00', '2020-04-24 03:00:00');