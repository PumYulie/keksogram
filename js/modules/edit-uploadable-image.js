//валидация хэштегов

let hashtagsArray = [];

const ifHashtagsRepeat = (value, inputElem) => {
  hashtagsArray = value
    .split('#')
    .filter((item) => item !== '')
    .map((item) => item.trim())
    .filter((item) => item !== '')
    .map((item) => item.toUpperCase());

  for (let i = 0; i < hashtagsArray.length; i++) {
    //в массиве останется минимум 1 item, который сравнивали со всеми
    const result = hashtagsArray.filter((item) => item === hashtagsArray[i]);
    if (result.length > 1) {
      inputElem.setCustomValidity('Нельзя повторять #хэштеги,даже разными регистрами букв');
      return;
    }
  }
};

const onHashtagInputInput = (evt, inputElem) => {
  const value = inputElem.value;

  if (inputElem.validity.tooShort) {
    if (value.length === 1 && value !== '#') {
      inputElem.value = '#';
    }
    inputElem.setCustomValidity('Допишите имя хэштега: #хэштег');
  } else if (inputElem.validity.tooLong) {
    inputElem.setCustomValidity(`Максимум 25 символов, удалите ${value.length - 25}`);

  } else if (value.length > 1 && evt.data) {//если стирают, evt.data = null
    if (!evt.data.match(/[0-9А-Яа-я#\s]/)) {
      inputElem.setCustomValidity(`${evt.data} - недопустимый символ`);
    } else if (value.match(/#\s/)) {
      inputElem.setCustomValidity('Все #хэштеги должны иметь минимум 1 знак после #');
    } else if (evt.data.match('#')) {
      const totalHashesArr = value.match(/#/g);//массив из #
      if (totalHashesArr.length > 1) {
        inputElem.setCustomValidity('Допишите имя хэштега, минимум 1 букву');
        if (value[-2] !== ' ') {
          inputElem.value = `${value.slice(0, -1)} #`;
        }
      }
      if (totalHashesArr.length > 5) {
        inputElem.setCustomValidity('Допустимо максимум 5 хэштегов, удалите лишний хэштег');
      }
    } else if (evt.data.match(' ')){
      inputElem.setCustomValidity('Каждый хэштег начинайте с #');
      inputElem.value = `${value.slice(0, -1)} #`;
      ifHashtagsRepeat(value, inputElem);
    } else {
      inputElem.setCustomValidity('');
    }

  } else {
    inputElem.setCustomValidity('');
  }

  inputElem.reportValidity();
};


// изменение масштаба изображения


export {onHashtagInputInput};
