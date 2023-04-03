import { isEscapeKey, getArrayFromString } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const COMMENT_ERROR_MESSAGE = 'Не более 140 символов';
const HASHTAG_ERROR_MESSAGE = 'Хэш-тег должен начинаться с #. Максимум 20 символов: буквы и цифры.';
const HASHTAGS_NUMBER_ERROR_MESSAGE = 'Не более 5 хэш-тегов';
const NOT_UNIQUE_HASHTAG_MESSAGE = 'Хэш-теги должны быть уникальными';
const VALID_SYMBOL = /^#[a-zа-яё]{1,19}$/i;
const MAX_HASHTAGS_NUMBER = 5;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const editFormCloseButton = imageEditForm.querySelector('.img-upload__cancel');
const imageUploadText = imageEditForm.querySelector('.img-upload__text');
const hashtagInput = imageUploadText.querySelector('.text__hashtags');
const commentTextInput = imageUploadText.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',

});

const validateHashtagSymbols = (hashtagFieldValue) => {
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
  const hashtags = getArrayFromString(hashtagFieldValue);
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(hashtagInput, isUniqueHashtag, NOT_UNIQUE_HASHTAG_MESSAGE);

const validateComment = (commentFieldValue) => commentFieldValue.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentTextInput, validateComment, COMMENT_ERROR_MESSAGE);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

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
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

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
