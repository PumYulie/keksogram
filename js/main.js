//import {getRandomPositiveInteger} from "./utils/get-random-positive-integer";
//import {getRandomArrayElement} from "./utils/get-random-array-element";

function getRandomPositiveInteger (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (array) => {
  const index = getRandomPositiveInteger(0, array.length - 1);
  return array[index];
};

const MOCK_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MOCK_NAMES = [
  'Юля', 'Валя', 'Зая', 'Петр', 'Красавчик', 'Вредитель-комментатор', 'бот из коробки'
];

let mockPictureIndex = 1; //меняется внутри цикла
const commentsIdsArr = [];

//ждет на вход массив уже созданных айдишек комментариев idsArr
const createMockComment = (idsArr) => {
  const generateId = () => {
    let idOption = getRandomPositiveInteger(1, 300);
    while (idsArr.find(item => item === idOption)) {
      idOption = getRandomPositiveInteger(1, 100);
    }
    return idOption;
  }

  return {
    id: generateId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MOCK_TEXTS),
    name: getRandomArrayElement(MOCK_NAMES),
  }
};

const createMockCommentsArray = () => {
  const generatedComments = [];
  const commentsAmount = getRandomPositiveInteger(0, 12);

  for (let i = 0; i < commentsAmount; i++) {
    const generatedComment = createMockComment(commentsIdsArr);
    commentsIdsArr.push(generatedComment.id);
    generatedComments.push(generatedComment);
  }

  return generatedComments;
}

const createMockPictureDescription = (id) => {
  mockPictureIndex++;

  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Афигительный отдых',
    likes: getRandomPositiveInteger(15, 200),
    comments: createMockCommentsArray(),
  }
};

const generateMockPictureDescriptions = () => {
  return Array.from({length: 25}, () => createMockPictureDescription(mockPictureIndex));
};

generateMockPictureDescriptions();
