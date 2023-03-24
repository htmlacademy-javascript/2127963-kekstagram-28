import { createPhotos, PHOTOS_NUMBER_MAX } from './data.js';
import { showBigPicture } from './big-picture.js';
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = createPhotos(PHOTOS_NUMBER_MAX);

const pictureListFragment = document.createDocumentFragment();

pictures.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.dataset.pictureId = picture.id;
  pictureListFragment.append(pictureElement);

  pictureElement.addEventListener ('click', (evt) => {
    evt.preventDefault();

    showBigPicture(picture);

  });
});

picturesList.append(pictureListFragment);
