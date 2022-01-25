import {utils} from './utils.js';

const START_COMMENTS = 5;
const ADD_COMMENTS = 5;
const bigPic = document.querySelector('.big-picture');
const bigPicImg = bigPic.querySelector('.big-picture__img img');
const bigPicClose = bigPic.querySelector('.big-picture__cancel');
const bigPicLike = bigPic.querySelector('.likes-count');
const bigPicCommentInput = bigPic.querySelector('.social__footer-text');
const bigPicCommentsCount = bigPic.querySelector('.comments-count');
const bigPicCommentsCurrentCount = bigPic.querySelector('.comments-current');
const bigPicComments = bigPic.querySelector('.social__comments');
const bigPicDescription = bigPic.querySelector('.social__caption');
const bigPicCommentFragment = new DocumentFragment();
const commentsLoader = document.querySelector('.comments-loader');

export const preview = (imgUrl, likeCount, description, comments) =>{
  console.log(comments.length);
  bigPicImg.src = imgUrl;
  bigPicLike.textContent = likeCount;
  bigPicDescription.textContent = description;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCommentsCurrentCount.textContent = comments.length > 5 ? 5 : comments.length;
  utils.openModal(bigPic);

  // Добавление коментов
  const renderComments = (comments, to) => {
    comments = comments.slice(0, to);
    comments.forEach(item => {
      const bigPicComment = bigPic.querySelector('.social__comment').cloneNode(true);
      const bigPicCommentsImg = bigPicComments.querySelector('img');
      const bigPicCommentsText = bigPicComments.querySelector('.social__text');
      bigPicCommentsImg.src = item.avatar;
      bigPicCommentsImg.alt = item.name;
      bigPicCommentsText.textContent = item.message;
      bigPicCommentFragment.append(bigPicComment);
    });
    bigPicComments.innerHTML = '';
    bigPicComments.append(bigPicCommentFragment);
  };
  if (comments.length < 5) {
    commentsLoader.classList.add('hidden');
    renderComments(comments, comments.length);
  } else {
    let currentComment = START_COMMENTS;
    commentsLoader.classList.remove('hidden');
    renderComments(comments, START_COMMENTS);
    const addComments = () => {
      currentComment += ADD_COMMENTS;
      renderComments(comments, currentComment);
      if (currentComment >= comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', addComments);
      }
    };
    commentsLoader.addEventListener('click', addComments);
  }


  //Обработчик закрытия
  bigPicClose.addEventListener('click', () => {
    utils.closeModal(bigPic);
  });
  document.addEventListener('keydown', e => {
    utils.isEscEvent(e, () => {
      if (document.activeElement !== bigPicCommentInput) {
        utils.closeModal(bigPic);
      }
    });
  });
};
