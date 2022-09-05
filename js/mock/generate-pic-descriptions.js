import {getRandomPositiveInteger, getRandomArrayElement} from '../utils/utils.js';
import {MOCK_NAMES, MOCK_TEXTS} from '../mock/mock-const.js';

let mockPictureIndex = 1; //меняется внутри цикла
const commentsIdsArr = [];

//ждет на вход массив айдишек уже созданных комментариев
const createMockComment = (idsArr) => {
  const generateId = () => {
    let idOption = getRandomPositiveInteger(1, 300);
    while (idsArr.find((item) => item === idOption)) {
      idOption = getRandomPositiveInteger(1, 100);
    }
    return idOption;
  };

  return {
    id: generateId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MOCK_TEXTS),
    name: getRandomArrayElement(MOCK_NAMES),
  };
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
};

const createMockPictureDescription = (id) => {
  mockPictureIndex++;

  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Афигительный отдых',
    likes: getRandomPositiveInteger(15, 200),
    comments: createMockCommentsArray(),
  };
};

// генерирует ОБЪЕКТЫ (мок-данные) для минипикс
// возвр МАССИВ объектов
const generateMockPictureDescriptions = () => Array.from({length: 25}, () => createMockPictureDescription(mockPictureIndex));

export {generateMockPictureDescriptions};
