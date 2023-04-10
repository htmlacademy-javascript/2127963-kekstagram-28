import { renderPictures } from './picture.js';
import './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const PHOTOS_NUMBER_MAX = 25;

getData()
  .then((photos) => {
    renderPictures(photos.slice(0, PHOTOS_NUMBER_MAX));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
