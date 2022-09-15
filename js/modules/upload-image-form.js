import {isEnterKey, isEscapeKey} from '../utils/utils.js';
import {onHashtagInputInput, onScaleWrapperKeydown, onScaleWrapperMousedown, onRadioBtnChange} from './edit-uploadable-image.js';

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


//пока тут изображение тестовое. должно подставляться то, что я выбираю в uploadImageInput
const imagePreview = uploadImageForm.querySelector('.img-upload__preview').querySelector('img');

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
const scaleWrapper = uploadImageForm.querySelector('.scale');
const scaleBiggerBtn = uploadImageForm.querySelector('.scale__control--bigger');
const scaleSmallerBtn = uploadImageForm.querySelector('.scale__control--smaller');
const currentScaleInput = uploadImageForm.querySelector('.scale__control--value');

scaleWrapper.addEventListener('mousedown', (evt) => onScaleWrapperMousedown(evt, scaleBiggerBtn, scaleSmallerBtn, currentScaleInput, imagePreview));

scaleWrapper.addEventListener('keydown', (evt) => onScaleWrapperKeydown(evt, scaleBiggerBtn, scaleSmallerBtn, currentScaleInput, imagePreview));


// наложение эффекта поверх фото
const effectsList = uploadImageForm.querySelector('.effects__list'); //ul
const sliderContainer = uploadImageForm.querySelector('.effect-level__slider');
const effectLevelInput = uploadImageForm.querySelector('.effect-level__value');

effectsList.addEventListener('change', (evt) => onRadioBtnChange(evt, sliderContainer, imagePreview, effectLevelInput));

//const uploadSubmitBtn = uploadImageForm.querySelector('#upload-submit');
//uploadSubmitBtn.addEventListener('mousedown', onUploadSubmitBtnClick);
//uploadSubmitBtn.addEventListener('keydown', onUploadSubmitBtnKeydown);

