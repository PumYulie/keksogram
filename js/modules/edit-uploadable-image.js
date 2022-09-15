import {isEnterKey} from '../utils/utils.js';

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

const onScaleWrapperMousedown = (evt, biggerBtn, smallerBtn, inputElem, img) => {
  if (evt.target !== biggerBtn && evt.target !== smallerBtn) { return; }

  let number = Number(inputElem.value.slice(0, -1));

  if (evt.target === biggerBtn) {
    number += 25;
    if (number >= 100) {
      inputElem.value = '100%';
      img.style.transform = 'scale(1)';
      return;
    }
  }

  if (evt.target === smallerBtn) {
    number -= 25;
    if (number <= 0) {
      inputElem.value = '0%';
      img.style.transform = 'scale(0.05)';
      return;
    }
  }

  inputElem.value = `${number}%`;
  img.style.transform = `scale(${number / 100})`;
};

const onScaleWrapperKeydown = (evt, biggerBtn, smallerBtn, inputElem, img) => {
  if (!isEnterKey(evt)) { return; }
  onScaleWrapperMousedown(evt, biggerBtn, smallerBtn, inputElem, img);
};


// наложение эффекта поверх фото
const onRadioBtnChange = (evt, sliderBox, img, hiddenInput) => {
  if (!evt.target.classList.contains('effects__radio')) { return; }

  if (sliderBox.noUiSlider) { //чтобы слайдер новый под каждый эффект
    sliderBox.noUiSlider.destroy();
  }

  if (evt.target.id === 'effect-none') {
    img.className = '';
    img.style.filter = '';
    return;
  }

  const newClass = `effects__preview--${evt.target.id.slice(7)}`;
  img.className = newClass;

  //создаю слайдер
  let sliderMin = 0;
  let sliderMax = 100;
  let formatToFunction = (value) => +(value / 100).toFixed(1);

  if (newClass.includes('marvin')) {
    formatToFunction = (value) => `${value}%`;
  }

  if (newClass.includes('phobos')) {
    sliderMin = 1;
    sliderMax = 300;
    formatToFunction = (value) => `${(value / 100).toFixed(1)}px`;
  }

  if (newClass.includes('heat')) {
    sliderMin = 100;
    sliderMax = 300;
  }

  hiddenInput.value = sliderMax; //вписываю в скрытое поле

  noUiSlider.create(sliderBox, {
    range: {
      min: sliderMin,
      max: sliderMax,
    },
    start: sliderMax,
    step: 1,
    connect: 'lower',
    format: {
      to: formatToFunction,
      from: (value) => parseFloat(value),
    },
  });

  //слайдер отдает в нужном формате благодаря formatToFunction
  //навешиваю на слайдер слушатель на каждое изменение слайдера
  sliderBox.noUiSlider.on('update', (values, handle) => {
    //Уровень эффекта записывается в скрытое поле для отправки на сервер
    hiddenInput.value = +(values[handle] * 100).toFixed(0);

    if (newClass.includes('chrome')) {
      img.style.filter = `grayscale(${values[handle]})`;
    } else if (newClass.includes('sepia')) {
      img.style.filter = `sepia(${values[handle]})`;
    } else if (newClass.includes('marvin')) {
      img.style.filter = `invert(${values[handle]})`;
      hiddenInput.value = parseInt(values[handle], 10);
    } else if (newClass.includes('phobos')) {
      img.style.filter = `blur(${values[handle]})`;
      hiddenInput.value = +(values[handle].slice(0, -2) * 100).toFixed(0);
    } else if (newClass.includes('heat')) {
      img.style.filter = `brightness(${values[handle]})`;
    }
  });

};


export {onHashtagInputInput, onScaleWrapperMousedown, onScaleWrapperKeydown, onRadioBtnChange};
