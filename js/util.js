const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createNumbersArray = (min, max) => {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

const shuffleArray = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    const removedElementIndex = getRandomInteger(0, elements.length - 1);
    const removedElement = elements[removedElementIndex];
    elements.splice(removedElementIndex, 1);
    elements.push(removedElement);
  }

  return elements;
};

export { getRandomInteger, getRandomArrayElement, createNumbersArray, shuffleArray };
