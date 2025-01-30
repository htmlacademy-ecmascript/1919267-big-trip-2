function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
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
  capitalizeFirstLetter,
};
