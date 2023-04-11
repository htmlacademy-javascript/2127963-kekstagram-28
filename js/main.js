import { renderPictures } from './picture.js';
import { showFilters, setOnFilterClick, getFilteredPictures } from './filter.js';
import './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((photos) => {

    renderPictures(photos);
    showFilters();

    setOnFilterClick (() => {
      renderPictures(getFilteredPictures(photos));
    }
    );
  })

  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
