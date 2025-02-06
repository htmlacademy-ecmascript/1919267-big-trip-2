import { FilterType } from '../const.js';
import dayjs from 'dayjs';

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

const filterPoints = (points, filterType) => (filter[filterType])(points);

const generateFilters = (points) => Object.entries(filter).map(
  ([filterType, filterMethod]) => ({
    type: filterType,
    count: filterMethod(points).length,
  })
);

export {filterPoints, generateFilters};
