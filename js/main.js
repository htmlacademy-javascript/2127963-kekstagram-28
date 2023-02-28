const PHOTOS_NUMBER_MIN = 1;
const PHOTOS_NUMBER_MAX = 25;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;
const COMMENT_ID_MIN = 1;
const COMMENT_ID_MAX = 1000;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;

const NAMES = ['Jean-Cla;ude', 'Sylvester', 'Jackie', 'Arnold', 'Bruce W.', 'Bruce L.'];

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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createPhoto = () => ({
  id: getRandomInteger(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX),
  url: `photos/${getRandomInteger(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX)}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
  comments: {
    id: getRandomInteger(COMMENT_ID_MIN, COMMENT_ID_MAX),
    avatar: `img/avatar-${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  },

});

const createPhotos = () => {
  const photos = Array.from({length: PHOTOS_NUMBER_MAX}, createPhoto);
  return photos;
};

createPhotos();
