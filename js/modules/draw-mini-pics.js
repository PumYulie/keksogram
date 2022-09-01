const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const createMinipicsHtmls = (picObjectsArray) => {
  const fragment = document.createDocumentFragment();

  picObjectsArray.forEach((picObject) => {
    const minipicHTML = template.cloneNode(true);

    minipicHTML.querySelector('.picture__img').src = picObject.url;
    minipicHTML.querySelector('.picture__likes').textContent = picObject.likes;
    minipicHTML.querySelector('.picture__comments').textContent = picObject.comments.length;

    fragment.append(minipicHTML);
  });

  return fragment; //заполнен разметками миниатюр
};


const drawMinipics = (objectsArray) => {
  const fullFragment = createMinipicsHtmls(objectsArray);
  document.querySelector('.pictures').append(fullFragment);
};


export {drawMinipics};
