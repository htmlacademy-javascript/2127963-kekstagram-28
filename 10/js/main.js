import { renderPictures } from './picture.js';
import { showFilters, setOnFilterClick, getFilteredPictures } from './filter.js';
import './form.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((photos) => {

    renderPictures(photos);
    showFilters();

    setOnFilterClick(debounce(
      () => renderPictures(getFilteredPictures(photos)),
      RERENDER_DELAY,
    ));
  })

  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
