const Price = {
  MIN: 10,
  MAX: 10000,
};

const POINTS_COUNT = 4;

const MILLISECONDS_IN_MINUTES = 60000;

const SECONDS_IN_MINUTES = 60;

const HOURS_IN_DAY = 24;

const DateFormat = {
  FULL_DATE: 'fullDate',
  MONTH_DAY: 'monthDay',
  TIME: 'time'
};

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export {Price, POINTS_COUNT, MILLISECONDS_IN_MINUTES, SECONDS_IN_MINUTES, HOURS_IN_DAY, DateFormat, months, pointTypes};
