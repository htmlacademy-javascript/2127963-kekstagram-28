import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);

  document.body.insertAdjacentElement('beforeend', successMessageElement);
  const successCloseButton = successMessageElement.querySelector('.success__button');

  const hideSuccessMessage = () => {
    successMessageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey (evt)) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  }

  successCloseButton.addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);

};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorMessageElement);
  const errorCloseButton = errorMessageElement.querySelector('.error__button');

  const hideErrorMessage = () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey (evt)) {
      evt.preventDefault();
      hideErrorMessage();
    }
  }

  errorCloseButton.addEventListener('click', hideErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);

};


export { showSuccessMessage, showErrorMessage };
