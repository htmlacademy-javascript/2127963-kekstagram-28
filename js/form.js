import { isEscapeKey } from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
//const imageUploadStart = imageUploadForm.querySelector('.img-upload__start');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const editFormCloseButton = imageEditForm.querySelector('.img-upload__cancel');

const closeEditForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
