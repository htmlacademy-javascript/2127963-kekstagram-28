import { getRandomInteger, getRandomArrayElement, createNumbersArray, shuffleArray } from './util.js';

const PHOTOS_NUMBER_MIN = 1;
const PHOTOS_NUMBER_MAX = 25;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;
const COMMENT_ID_MIN = 1;
const COMMENT_ID_MAX = 1000;
const COMMENTS_NUMBER_MIN = 1;
const COMMENTS_NUMBER_MAX = 10;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;

const NAMES = ['Jean-Claude', 'Sylvester', 'Jackie', 'Arnold', 'Bruce W.', 'Bruce L.'];

const PHOTO_DESCRIPTIONS = [
  'My lovely bike',
  'Love my puppy',
  'Isn\'t it great?',
  'Best friend',
  'Weird...',
  'Leave a comment',
  'Enjoyable',
  'Enjoy yourself',
  'My HERO',
  'What if...',
  'How is it possible?!!!',
  'Not a piece of cake',
  'Easy-peasy',
  'Fresh and squeezy',
  'Lemon squeezy',
  'Great choice!',
  'How about riding a bike around the island?',
  'Let\'s do it!',
  'Make LOVE',
  'Once upon a time...',
  'Happy!!!',
  'Happier...',
  'The HAPPIEST :)',
  'Are you nuts?',
  'You and me',
];

const MESSAGES = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
  'В целом всё неплохо. Но не всё.',
];

const createPhotos = (photosNumber) => {

  const photos = [];

  let photoIds = createNumbersArray(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX);
  let urls = createNumbersArray(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX);
  let commentIds = createNumbersArray(COMMENT_ID_MIN, COMMENT_ID_MAX);

  photoIds = shuffleArray(photoIds);
  commentIds = shuffleArray(commentIds);
  urls = shuffleArray(urls);

  for (let i = 0; i < photosNumber; i++) {
    const commentsNumber = getRandomInteger(COMMENTS_NUMBER_MIN, COMMENTS_NUMBER_MAX);

    const pictureComments = [];
    for (let j = 0; j < commentsNumber; j++) {
      pictureComments[j] = {};
      pictureComments[j].id = commentIds[i];
      pictureComments[j].avatar = `img/avatar-${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`;
      pictureComments[j].message = getRandomArrayElement(MESSAGES);
      pictureComments[j].name = getRandomArrayElement(NAMES);
    }

    photos[i] = {
      id: photoIds[i],
      url: `photos/${urls[i]}.jpg`,
      description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
      likes: getRandomInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
      comments: pictureComments,
    };
  }

  return photos;
};

export { createPhotos, PHOTOS_NUMBER_MAX };
