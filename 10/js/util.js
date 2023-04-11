const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.color = 'black';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const getArrayFromString = (string) => string.trim().split(' ');

export { showAlert, getRandomInteger, getRandomArrayElement, createNumbersArray, shuffleArray, isEscapeKey, getArrayFromString, debounce };
