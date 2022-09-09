const bigPic = document.querySelector('.big-picture');
const closeBtn = bigPic.querySelector('.big-picture__cancel');
const commentsList = bigPic.querySelector('.social__comments');
const moreCommentsBtn = bigPic.querySelector('.comments-loader');
const commentsCounterElem = bigPic.querySelector('.social__comment-count');

let maxOpenComments;
const stepToOpenComments = 5;

//возвращает единую строку разметки
const createCommentsHtml = (commentObjArray) => {
  let commentsString = '';

  for (const commentObj of commentObjArray) {
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

//вырезаю нужный кусок массива и скармливаю его функции, кот сделает из массива разметку(строку) и вставит в страницу
const drawComments = (commentsArr) => {
  const commentsObjectsToShow = commentsArr.slice(0, maxOpenComments);
  commentsCounterElem.textContent = `${commentsObjectsToShow.length} из ${commentsArr.length}`;

  commentsList.innerHTML = createCommentsHtml(commentsObjectsToShow);
};

const onMoreCommentsClick = (commentsArray) => {
  maxOpenComments += stepToOpenComments;
  if (commentsArray.length <= maxOpenComments) {
    moreCommentsBtn.hidden = true;
    moreCommentsBtn.removeEventListener('click', () => onMoreCommentsClick(commentsArray));
  }
  drawComments(commentsArray);
};

const fillBigPicData = (clickedMinipicObj, bigpic) => {
  bigpic.querySelector('.big-picture__img').src = clickedMinipicObj.url;
  bigpic.querySelector('.likes-count').textContent = clickedMinipicObj.likes;
  bigpic.querySelector('.comments-count').textContent = clickedMinipicObj.comments.length;
  bigpic.querySelector('.social__caption').textContent = clickedMinipicObj.description;

  commentsList.innerHTML = '';
  const commentsArray = clickedMinipicObj.comments;
  maxOpenComments = 5;

  drawComments(commentsArray, maxOpenComments);

  if (commentsArray.length > 5) {
    moreCommentsBtn.addEventListener('click', () => onMoreCommentsClick(commentsArray));
  } else {
    moreCommentsBtn.hidden = true;
  }
};

const onCloseBtnClick = () => {
  closeBigPic();
};

const onBigPicESCKeydown = (evt) => {
  if (evt.key !== 'Escape') { return; }
  closeBigPic();
};

//мини-жертва синтаксиса, тк используется выше в функциях
function closeBigPic() {
  bigPic.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onBigPicESCKeydown);

  if (!moreCommentsBtn.hidden) {
    moreCommentsBtn.removeEventListener('click', onMoreCommentsClick);
  }
  maxOpenComments = 5;

}

const openBigPic = (clickedMinipicObj) => {
  bigPic.classList.remove('hidden');
  document.body.classList.add('modal-open'); //чтобы фон не скролился

  fillBigPicData(clickedMinipicObj, bigPic);

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onBigPicESCKeydown);
};

export {openBigPic};
