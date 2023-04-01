import { isEscapeKey } from './util.js';

const MAX_COMMENT_LENGTH = 10;
const COMMENT_ERROR_TEXT = 'Не более 140 символов';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const editFormCloseButton = imageEditForm.querySelector('.img-upload__cancel');
const commentText = imageEditForm.querySelector('.text__description');

const closeEditForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imageUploadInput.value = '';
  commentText.value = '';


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

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',

});

const validateComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentText, validateComment, COMMENT_ERROR_TEXT);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
