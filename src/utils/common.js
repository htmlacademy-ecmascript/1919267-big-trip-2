function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const startDate = new Date('2023-01-01'); // Начальная дата
const endDate = new Date('2024-12-31'); // Конечная дата

function getRandomDate() {
  const diff = endDate.getTime() - startDate.getTime();
  const newDate = new Date(startDate.getTime() + Math.random() * diff);
  return newDate.toISOString();
}

export {
  getRandomArrayElement,
  getRandomPositiveInteger,
  getRandomDate
};
