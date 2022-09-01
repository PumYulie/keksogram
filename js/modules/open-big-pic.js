// на вход я получаю event.target.
// в нем я вижу, на какой минипик (объект) кликнули.
// заполняю большую картинку данными из ивент таргета - тк это объект то должно показать все эти параметры

const createCommentsHtml = (commentObjArray) => {
  let commentsString = '';

  for (let commentObj of commentObjArray) {
    const commentHTML = `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${commentObj.avatar}"
        alt="${commentObj.name}"
        width="35" height="35">
      <p class="social__text">${commentObj.message}</p>
    </li>`;

    commentsString += commentHTML;
  }
  return commentsString;
};


const fillBigPicData = (clickedMinipicObj, bigPic) => {
  bigPic.querySelector('.big-picture__img').src = clickedMinipicObj.url;
  bigPic.querySelector('.likes-count').textContent = clickedMinipicObj.likes;
  bigPic.querySelector('.comments-count').textContent = clickedMinipicObj.comments.length;
  bigPic.querySelector('.social__caption').textContent = clickedMinipicObj.description;

  const commentsList = bigPic.querySelector('.social__comments');
  commentsList.innerHTML = '';

  if (clickedMinipicObj.comments.length) {
    commentsList.innerHTML = createCommentsHtml(clickedMinipicObj.comments);
  }
};


const openBigPic = (clickedMinipicObj) => {
  const bigPic = document.querySelector('.big-picture');
  bigPic.classList.remove('hidden');

  fillBigPicData(clickedMinipicObj, bigPic);
  bigPic.querySelector('.social__comment-count').classList.add('hidden');
  bigPic.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open'); //чтобы фон не скролился

  //ДОДЕЛАТЬ слушатели
  const closeBtn = bigPic.querySelector('.big-picture__cancel');
  //closeBtn.addEventListener('click', closeBigPicClick);
  //closeBtn.addEventListener('keydown', (evt) => closeBigPicKeydown);
};

export {openBigPic};
