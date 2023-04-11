import { shuffleArray } from './util.js';

const RANDOM_PICTURES_NUMBER = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let selectedFilter = Filters.DEFAULT;

const showFilters = () => {
  filterElement.classList.remove('img-filters--inactive');
};

const getFilteredPictures = (photos) => {
  let filteredPictures = photos.slice();

  switch (selectedFilter) {
    case Filters.RANDOM:
      filteredPictures = shuffleArray(filteredPictures).slice(0, RANDOM_PICTURES_NUMBER);
      return filteredPictures;

    case Filters.DISCUSSED:
      filteredPictures.sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
      return filteredPictures;

    default:
      return filteredPictures;
  }

};

const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {

    if (!evt.target.matches('.img-filters__button')) {
      return;
    }

    const clickedFilter = evt.target;
    if (clickedFilter.id === selectedFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedFilter.classList.add('img-filters__button--active');
    selectedFilter = clickedFilter.id;

    cb();
  });
};


export { showFilters, setOnFilterClick, getFilteredPictures };
