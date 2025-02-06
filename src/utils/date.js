import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(minMax);
dayjs.extend(durationPlugin);

/**
 * Функция, возвращающая отформатированную дату
 * @param {dayjs.ConfigType} date
 * @param {string} dateFormat
 * @returns {string}
 */

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

/**
 * Функция, возвращающая длительность события
 * @param {dayjs.ConfigType} dateFrom
 * @param {dayjs.ConfigType} dateTo
 * @returns {string}
 */

function getDuration (dateFrom, dateTo) {
  if (!dateFrom && !dateTo) {
    return '';
  }

  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  const durationInUnits = dayjs.duration(dateEnd.diff(dateStart));
  const { $d: durationUnitsObject } = durationInUnits;
  if (durationUnitsObject.months > 0) {
    const monthsInMilliseconds = dayjs.duration(durationUnitsObject.months, 'month');
    durationUnitsObject.days += dayjs.duration(monthsInMilliseconds.$ms).asDays();
  }
  if (durationUnitsObject.years > 0) {
    const yearsInMilliseconds = dayjs.duration(durationUnitsObject.years, 'year');
    durationUnitsObject.days += dayjs.duration(yearsInMilliseconds.$ms).asDays();
  }
  if (durationUnitsObject.days > 0) {
    return durationInUnits.format('DD[D] HH[H] mm[M]');
  }
  if (durationUnitsObject.hours > 0) {
    return durationInUnits.format('HH[H] mm[M]');
  }
  return durationInUnits.format('mm[M]');
}

function isDatesEqual (dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPricesEqual (numberA, numberB) {
  return numberA === numberB;
}

export {
  formatDate,
  getDuration,
  isDatesEqual,
  isPricesEqual
};
