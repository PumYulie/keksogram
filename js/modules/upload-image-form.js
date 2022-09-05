import {isEnterKey, isEscapeKey} from '../utils/utils.js';

const uploadImageButton = document.querySelector('#upload-file');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const closeButton = uploadImageForm.querySelector('#upload-cancel');


const closeUploadImageForm = () => {
  document.body.classList.remove('modal-open');
  uploadImageForm.classList.add('hidden');

  closeButton.removeEventListener('click', onFormCloseBtnClick);
};

const onOpennedFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault(); //иначе яблочники вылетают из полноэкранного режима
    closeUploadImageForm();
    //снести обработчики на ..
  }
};

const onFormCloseBtnClick = (evt) => {
  evt.preventDefault(); //иначе button type=reset хз что ресетит

  closeUploadImageForm();
  document.removeEventListener('keydown', onOpennedFormKeydown);
};

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

uploadImageButton.addEventListener('click', onUploadImageBtnClick);
uploadImageButton.addEventListener('keydown', onUploadImageBtnKeydown);
