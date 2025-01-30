import { FilterType } from '../const.js';
import dayjs from 'dayjs';

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return dayjs().isBefore(point.dateFrom) && dayjs().isAfter(point.dateTo);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point))
};

const filterPoints = (points, filterType) => {
  const newFilteredPoints = filter[filterType](points);
  return newFilteredPoints;
};

const generateFilters = (points) => Object.entries(filter).map(
  ([filterType, filterMethod]) => ({
    type: filterType,
    count: filterMethod(points).length,
  })
);

export {filterPoints, generateFilters};
