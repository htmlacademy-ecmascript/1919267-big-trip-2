import { DateFormat, MONTHS } from '../const.js';

function addZero (data) {
  return data < 10 ? `0${data}` : data;
}

function humanizePointDueDate(dateString, format) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();

  switch(format) {
    case (DateFormat.FULL_DATE):
      return `${addZero(day)}/${addZero(month)}/${year.toString().slice(-2)} ${addZero(hours)}:${addZero(minutes)}`;
    case (DateFormat.MONTH_DAY):
      return `${MONTHS[month - 1]} ${day}`;
    case (DateFormat.TIME):
      return `${addZero(hours)}:${addZero(minutes)}`;
    case (DateFormat.TRIP_INFO_SHORT):
      return `${addZero(day)}`;
    case (DateFormat.TRIP_INFO):
      return `${addZero(day)} ${MONTHS[month - 1]}`;
    default:
      return `${year}-${addZero(month)}-${addZero(day)}`;
  }
}

function getDuration (dateFrom, dateTo) {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);
  const difference = endDate - startDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  let message = '';
  message += (days > 0) ? `${days}D ` : '';
  message += (hours > 0) ? `${hours}H ` : '';
  message += (minutes > 0) ? `${minutes}M` : '';

  return message;
}

export {
  humanizePointDueDate,
  getDuration,
};
