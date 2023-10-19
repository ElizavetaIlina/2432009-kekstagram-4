const NAMES = [
  'Irishka220',
  'MaxCool',
  'Boris_Redwall',
  'MiniCat',
  'MariaBlog'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MAX_PHOTOS_COUNT = 25;

const IdNumber = {
  MIN: 1,
  MAX: 25
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const UrlNumber = {
  MIN: 1,
  MAX: 25
};

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const AvatarNumber = {
  MIN: 1,
  MAX: 6,
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getUniqueRandomId = (min,max,array) => {
  const getRandomId = createRandomIdFromRangeGenerator(min, max);
  let randomId = getRandomId();
  while (array.includes(randomId)) {
    randomId = getRandomId();
  }
  array.push(randomId);

  return randomId;
};

const usedId = [];
const getId = () => getUniqueRandomId(IdNumber.MIN,IdNumber.MAX,usedId);

const usedUrlIndex = [];
const getUrlIndex = () => getUniqueRandomId(UrlNumber.MIN, UrlNumber.MAX, usedUrlIndex);

const getLikes = () => getRandomInteger(LikesCount.MIN, LikesCount.MAX);

const usedAvatarIndex = [];
const getAvatarIndex = () => getUniqueRandomId(AvatarNumber.MIN, AvatarNumber.MAX, usedAvatarIndex);


const getComments = () => ({
  id: getId(),
  avatar: `img/avatar-${ getAvatarIndex() }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length-1)],
  name:NAMES[getRandomInteger(0, NAMES.length-1)]
});

const generatePhotoDescription = () => ({
  id: getId(),
  url: `photos/${ getUrlIndex() }.jpg`,
  description: 'Посмотрите, какую фотографию я сделал!',
  likes: getLikes(),
  comments: Array.from({length:getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, getComments)
});

const getPhotoDescription = () => Array.from({length:MAX_PHOTOS_COUNT}, generatePhotoDescription);
getPhotoDescription();
