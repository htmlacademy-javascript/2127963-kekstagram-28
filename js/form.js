import { isEscapeKey, getArrayFromString } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { uploadFile } from './user-picture.js';

const MAX_COMMENT_LENGTH = 140;
const COMMENT_ERROR_MESSAGE = 'Не более 140 символов';
const HASHTAG_ERROR_MESSAGE = 'Хэш-тег должен начинаться с #. Максимум 20 символов: буквы и цифры.';
const HASHTAGS_NUMBER_ERROR_MESSAGE = 'Не более 5 хэш-тегов';
const NOT_UNIQUE_HASHTAG_MESSAGE = 'Хэш-теги должны быть уникальными';
const VALID_SYMBOL = /^#[a-zа-яё]{1,19}$/i;
const MAX_HASHTAGS_NUMBER = 5;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const editFormCloseButton = imageEditForm.querySelector('.img-upload__cancel');
const imageUploadText = imageEditForm.querySelector('.img-upload__text');
const hashtagInput = imageUploadText.querySelector('.text__hashtags');
const commentTextInput = imageUploadText.querySelector('.text__description');
const submitButton = imageEditForm.querySelector('.img-upload__submit');


const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',

});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const validateHashtagSymbols = (hashtagFieldValue) => {
  if (!hashtagFieldValue) {
    return true;
  }
  const hashtags = getArrayFromString(hashtagFieldValue);
  return hashtags.every((hashtag) => VALID_SYMBOL.test(hashtag));

};

pristine.addValidator(hashtagInput, validateHashtagSymbols, HASHTAG_ERROR_MESSAGE);

const validateHashtagNumber = (hashtagFieldValue) => {
  const hashtags = getArrayFromString(hashtagFieldValue);
  return hashtags.length <= MAX_HASHTAGS_NUMBER;

};

pristine.addValidator(hashtagInput, validateHashtagNumber, HASHTAGS_NUMBER_ERROR_MESSAGE);

const isUniqueHashtag = (hashtagFieldValue) => {
  const hashtags = getArrayFromString(hashtagFieldValue.toLowerCase());
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(hashtagInput, isUniqueHashtag, NOT_UNIQUE_HASHTAG_MESSAGE);

const validateComment = (commentFieldValue) => commentFieldValue.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentTextInput, validateComment, COMMENT_ERROR_MESSAGE);


const setOnFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
          document.removeEventListener('keydown', onDocumentKeydown);
        })
        .finally(unblockSubmitButton);
    }
  });

};


imageUploadText.addEventListener('focus', (evt) => {
  if (evt.target.closest('.img-upload__field-wrapper')) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
},
true
);

imageUploadText.addEventListener('blur', (evt) => {
  if (evt.target.closest('.img-upload__field-wrapper')) {
    document.addEventListener('keydown', onDocumentKeydown);
  }
},
true
);

const closeEditForm = () => {
  imageUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();

  document.addEventListener('keydown', onDocumentKeydown);
  editFormCloseButton.addEventListener('click', closeEditForm);
};

imageUploadInput.addEventListener('change', () => {
  openEditForm();
}
);

function onDocumentKeydown (evt) {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeEditForm();
  }
}
uploadFile();

setOnFormSubmit (closeEditForm);
