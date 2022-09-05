export function getRandomPositiveInteger (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export const getRandomArrayElement = (array) => {
  const index = getRandomPositiveInteger(0, array.length - 1);
  return array[index];
};

export const isEnterKey = (evt) => evt.key === 'Enter';
export const isEscapeKey = (evt) => evt.key === 'Escape';

//не исп-ся
export const getTwoDigitsFrom01To10 = () => {
  const number = getRandomPositiveInteger(1, 10);
  return number < 10 ? `0${number}` : `${number}`;
};
//не исп-ся
export function getRandomPositiveFloat (firstNumber, secondNumber, digits = 1) {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}
