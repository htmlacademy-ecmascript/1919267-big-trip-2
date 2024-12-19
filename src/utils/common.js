import { DateFormat, months } from '../const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

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
      return `${months[month - 1]} ${day}`;
    case (DateFormat.TIME):
      return `${addZero(hours)}:${addZero(minutes)}`;
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

function capitalizeFirstLetter(word) {
  if (word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export {
  getRandomArrayElement,
  getRandomPositiveInteger,
  humanizePointDueDate,
  getDuration,
  capitalizeFirstLetter
};
