const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DIVISOR = 100;

const scaleControlElement = document.querySelector('.scale__control--value');
const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / DIVISOR})`;
  scaleControlElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {

  const currentScaleValue = parseInt(scaleControlElement.value, 10);
  let newScaleValue = currentScaleValue - SCALE_STEP;

  if (newScaleValue < SCALE_MIN) {
    newScaleValue = SCALE_MIN;
  }

  scaleImage(newScaleValue);
};

const onBiggerButtonClick = () => {

  const currentScaleValue = parseInt(scaleControlElement.value, 10);
  let newScaleValue = currentScaleValue + SCALE_STEP;

  if (newScaleValue > SCALE_MAX) {
    newScaleValue = SCALE_MAX;
  }

  scaleImage(newScaleValue);
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
