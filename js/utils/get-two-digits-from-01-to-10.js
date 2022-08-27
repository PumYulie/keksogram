import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const getTwoDigitsFrom01To10 = () => {
  const number = getRandomPositiveInteger(1, 10);
  return number < 10 ? `0${number}` : `${number}`;
};

export {getTwoDigitsFrom01To10};
