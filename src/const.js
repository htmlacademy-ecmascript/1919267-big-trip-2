const BLANK_POINT = {
  destination: '',
  isFavorite: false,
  offers: [],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  type: 'flight'
};

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
const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  FAILED: 'FAILED'
};

const FilterTypeNoItemsMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const AUTHORIZATION = 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const Url = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const LoadingMessage = {
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information'
};

const TimeLimit = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000,
};

export {
  BLANK_POINT,
  Price,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES,
  HOURS_IN_DAY,
  DateFormat,
  MONTHS,
  FilterType,
  Mode,
  SortType,
  AvailableSortType,
  DEFAULT_SORT_TYPE,
  DEFAULT_FILTER_TYPE,
  UserAction,
  UpdateType,
  FilterTypeNoItemsMessage,
  AUTHORIZATION,
  END_POINT,
  Method,
  Url,
  LoadingMessage,
  TimeLimit
};
