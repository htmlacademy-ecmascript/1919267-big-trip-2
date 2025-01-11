const Price = {
  MIN: 10,
  MAX: 10000,
};

const MILLISECONDS_IN_MINUTES = 60000;

const SECONDS_IN_MINUTES = 60;

const HOURS_IN_DAY = 24;

const DateFormat = {
  MONTH_DAY: 'MMM DD',
  FULL_DATE: 'DD/MM/YY[&nbsp;]hh:mm',
  TIME: 'HH:mm',
  TRIP_INFO_SHORT: 'DD',
  TRIP_INFO: 'DD MMM'
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const AvailableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false
};

const DEFAULT_SORT_TYPE = SortType.DAY;

export {Price, MILLISECONDS_IN_MINUTES, SECONDS_IN_MINUTES, HOURS_IN_DAY, DateFormat, MONTHS, FilterType, Mode, SortType, AvailableSortType, DEFAULT_SORT_TYPE};
