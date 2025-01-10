import dayjs from 'dayjs';
import { SortType } from '../const.js';

function getPointsDateDifference(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function getPointsDurationDifference(eventA, eventB) {
  const pointADuration = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const pointBDuration = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));
  return pointBDuration - pointADuration;
}

function getPointsPriceDifference(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const sorting = {
  [SortType.DAY]: (points) => points.toSorted(getPointsDateDifference),
  [SortType.PRICE]: (points) => points.toSorted(getPointsPriceDifference),
  [SortType.TIME]: (points) => points.toSorted(getPointsDurationDifference),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implemented`);
  },
  [SortType.OFFERS]: () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not implemented`);
  }
};

function sortItems (currentType, items) {
  return sorting[currentType](items);
}

export {sortItems};
