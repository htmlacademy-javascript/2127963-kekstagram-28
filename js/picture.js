import { showBigPicture } from './big-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({url, likes, comments, id}) => {

  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.pictureId = id;

  return pictureElement;

};

const renderPictures = (photos) => {

  picturesList.addEventListener ('click', (evt) => {

    const smallPicture = evt.target.closest('[data-picture-id]');
    if (!smallPicture) {
      return;
    }

    evt.preventDefault();

    const bigPicture = photos.find((photo) =>
      photo.id === Number(smallPicture.dataset.pictureId)
    );

    showBigPicture(bigPicture);

  });


  const pictureListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = createPicture(photo);
    pictureListFragment.append(pictureElement);

  });

  picturesList.append(pictureListFragment);

};

export { renderPictures };
