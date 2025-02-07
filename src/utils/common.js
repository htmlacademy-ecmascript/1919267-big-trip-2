function capitalizeFirstLetter(word) {
  if (word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export {capitalizeFirstLetter};
