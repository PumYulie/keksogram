import {isEnterKey, isEscapeKey} from '../utils/utils.js';


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
  //ПОКА НЕ РАБОТАЕТ, а надо сбрасывать
  //uploadImageInput.value = '';
};

const onFormCloseBtnClick = (evt) => {
  evt.preventDefault(); //иначе button type=reset хз что ресетит
  closeUploadImageForm();
  closeButton.removeEventListener('click', onFormCloseBtnClick);
  document.removeEventListener('keydown', onOpennedFormKeydown);
};

//мини-жертва, чтобы пойти дальше. тк используется ВЫШЕ в onFormCloseBtnClick
function onOpennedFormKeydown (evt) {
  if (isEscapeKey(evt) && uploadHashtagInput !== document.activeElement &&uploadCommentTextarea !== document.activeElement) {
    evt.preventDefault(); //иначе яблочники вылетают из полноэкранного режима
    closeUploadImageForm();
    closeButton.removeEventListener('click', onFormCloseBtnClick);
    document.removeEventListener('keydown', onOpennedFormKeydown);
  }
}

const openUploadImageForm = () => {
  uploadImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

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


// валидация хэштегов начало

let hashtagsArray = [];

const ifHashtagsRepeat = (value) => {
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
      uploadHashtagInput.setCustomValidity('Нельзя повторять #хэштеги,даже разными регистрами букв');
      return;
    }
  }
};

const onHashtagInputInput = (evt) => {
  const value = uploadHashtagInput.value;

  if (uploadHashtagInput.validity.tooShort) {
    if (value.length === 1 && value !== '#') {
      uploadHashtagInput.value = '#';
    }
    uploadHashtagInput.setCustomValidity('Допишите имя хэштега: #хэштег');
  } else if (uploadHashtagInput.validity.tooLong) {
    uploadHashtagInput.setCustomValidity(`Максимум 25 символов, удалите ${value.length - 25}`);

  } else if (value.length > 1 && evt.data) {//если стирают, evt.data = null
    if (!evt.data.match(/[0-9А-Яа-я#\s]/)) {
      uploadHashtagInput.setCustomValidity(`${evt.data} - недопустимый символ`);
    } else if (value.match(/#\s/)) {
      uploadHashtagInput.setCustomValidity('Все #хэштеги должны иметь минимум 1 знак после #');
    } else if (evt.data.match('#')) {
      const totalHashesArr = value.match(/#/g);//массив из #
      if (totalHashesArr.length > 1) {
        uploadHashtagInput.setCustomValidity('Допишите имя хэштега, минимум 1 букву');
        if (value[-2] !== ' ') {
          uploadHashtagInput.value = `${value.slice(0, -1)} #`;
        }
      }
      if (totalHashesArr.length > 5) {
        uploadHashtagInput.setCustomValidity('Допустимо максимум 5 хэштегов, удалите лишний хэштег');
      }
    } else if (evt.data.match(' ')){
      uploadHashtagInput.setCustomValidity('Каждый хэштег начинайте с #');
      uploadHashtagInput.value = `${value.slice(0, -1)} #`;
      ifHashtagsRepeat(value);
    } else {
      uploadHashtagInput.setCustomValidity('');
    }

  } else {
    uploadHashtagInput.setCustomValidity('');
  }

  uploadHashtagInput.reportValidity();
};

uploadHashtagInput.addEventListener('input', onHashtagInputInput);
//валидация хэштегов закончилась



//uploadSubmitBtn.addEventListener('click', onUploadSubmitBtnClick);
//uploadSubmitBtn.addEventListener('keydown', onUploadSubmitBtnKeydown);

