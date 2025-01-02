import { FilterType } from '../const.js';

function isPointFuture(point) {
  return new Date(point.dateFrom) > new Date();
}

function isPointPresent(point) {
  const currentDate = new Date();
  return (new Date(point.dateFrom) <= currentDate) && (new Date(point.dateTo) >= currentDate);
}

function isPointPast(point) {
  return new Date(point.dateTo) < new Date();
}

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point))
};

const filterPoints = (points, filterType) => (filter[filterType])(points);

const generateFilters = (points) => Object.entries(filter).map(
  ([filterType, filterMethod]) => ({
    type: filterType,
    count: filterMethod(points).length,
  })
);

export {filterPoints, generateFilters};
