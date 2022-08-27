import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const getRandomArrayElement = (array) => {
  const index = getRandomPositiveInteger(0, array.length - 1);
  return array[index];
};

export {getRandomArrayElement};
