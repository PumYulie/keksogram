import {isEnterKey, isEscapeKey} from '../utils/utils.js';
import {onHashtagInputInput} from './edit-uploadable-image.js';

//в этом модуле
//открываю окно с подгрузкой изображения,
//создаю DOM-элементы этого окна,
//навешиваю слушатели на все интерактивные элементы,
//отправляю новое изображение на сервер по кнопке сабмит,
//или закрываю окно (со снятием слушателей с интерактивных элементов)

const uploadImageInput = document.querySelector('#upload-file');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const closeButton = uploadImageForm.querySelector('#upload-cancel');

const uploadHashtagInput = uploadImageForm.querySelector('.text__hashtags');
const uploadCommentTextarea = uploadImageForm.querySelector('.text__description');

const uploadSubmitBtn = uploadImageForm.querySelector('#upload-submit');

//пока тут изображение тестовое. должно подставляться то, что я выбираю в uploadImageInput
const uploadableImagePreview = uploadImageForm.querySelector('.img-upload__preview');

const closeUploadImageForm = () => {
  document.body.classList.remove('modal-open');
  uploadImageForm.classList.add('hidden');

  //сбросить все навешенные слушатели с интерактивных элементов??
  //с uploadHashtagInput ? (навешиваю в openUploadImageForm)

  //ПОКА НЕ РАБОТАЕТ, а надо сбрасывать
  //uploadImageInput.value = '';
};

const onFormCloseBtnClick = (evt) => {
  evt.preventDefault(); //иначе button type=reset хз что ресетит
  closeUploadImageForm();
  closeButton.removeEventListener('click', onFormCloseBtnClick);
  document.removeEventListener('keydown', onOpennedFormKeydown);
};

//мини-жертва, тк используется ВЫШЕ в onFormCloseBtnClick
function onOpennedFormKeydown (evt) {
  if (isEscapeKey(evt) && uploadHashtagInput !== document.activeElement && uploadCommentTextarea !== document.activeElement) {
    evt.preventDefault(); //иначе яблочники вылетают из полноэкранного режима
    closeUploadImageForm();
    closeButton.removeEventListener('click', onFormCloseBtnClick);
    document.removeEventListener('keydown', onOpennedFormKeydown);
  }
}

const openUploadImageForm = () => {
  uploadImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // навешиваю каждый раз. или навесить просто чтобы всегода был???
  uploadHashtagInput.addEventListener('input', (evt) => onHashtagInputInput(evt, uploadHashtagInput));

  document.addEventListener('keydown', onOpennedFormKeydown);
  closeButton.addEventListener('click', onFormCloseBtnClick);
};

const onUploadImageBtnClick = (evt) => {
  evt.preventDefault(); //временно, чтобы не открывался выбор картинок с компа
  openUploadImageForm();
};

const onUploadImageBtnKeydown = (evt) => {
  if (!isEnterKey(evt)) { return; }
  openUploadImageForm();
};

uploadImageInput.addEventListener('click', onUploadImageBtnClick);
uploadImageInput.addEventListener('keydown', onUploadImageBtnKeydown);

// изменение масштаба изображения
const scaleBiggerBtn = uploadImageForm.querySelector('.scale__control--bigger');
const scaleSmallerBtn = uploadImageForm.querySelector('.scale__control--smaller');
const currentScaleInput = uploadImageForm.querySelector('.scale__control--value');

/* const onScaleBiggerBtnClick = () => {
  if (currentScaleInput.value === '100%') {
    console.log('уже 100, я ухожу');
    return;
  }
  const newValueNumber = Number(currentScaleInput.value.slice(0, -1)) + 25;
  console.log('newValueNumber', newValueNumber, 'работает onScaleBiggerBtnClick');
  if (newValueNumber > 100) {
    currentScaleInput.value = '100%';
  } else {
    currentScaleInput.value = `${newValueNumber}%`;
  }
}; */

/* const onScaleBiggerBtnKeydown = (evt) => {
  if (isEnterKey(evt)) {
    onScaleBiggerBtnClick();
  }
}; */

const onScaleSmallerBtnClick = () => {
  if (currentScaleInput.value === '0%') {
    console.log('уже 0, я ухожу');
    return;
  }
  const inputValueNumbered = Number(currentScaleInput.value.slice(0, -1));
  console.log('onScaleSmallerBtnClick обрезает до числа', inputValueNumbered);

  console.log('иду присваивать в поле вода значение', inputValueNumbered);
  if ((inputValueNumbered - 25) <= 0) {
    currentScaleInput.value = '0%';
  } else {
    console.log('калькулирую');
    currentScaleInput.value = `${inputValueNumbered - 25}%`;
    console.log('итоговое currentScaleInput.value', currentScaleInput.value);
  }
};

const onScaleSmallerBtnKeydown = (evt) => {
  if (!isEnterKey(evt)) { return; }

  console.log('норм, обработчик вызывается 1раз, ДО вызова в поле', currentScaleInput.value);
  onScaleSmallerBtnClick();
};

//scaleBiggerBtn.addEventListener('click', onScaleBiggerBtnClick);
//scaleBiggerBtn.addEventListener('keydown', onScaleBiggerBtnKeydown);

scaleSmallerBtn.addEventListener('click', onScaleSmallerBtnClick);
scaleSmallerBtn.addEventListener('keydown', onScaleSmallerBtnKeydown);

//uploadSubmitBtn.addEventListener('click', onUploadSubmitBtnClick);
//uploadSubmitBtn.addEventListener('keydown', onUploadSubmitBtnKeydown);

