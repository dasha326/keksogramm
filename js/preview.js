import {utils} from './utils.js';

const bigPic = document.querySelector('.big-picture');
const bigPicImg = bigPic.querySelector('.big-picture__img img');
const bigPicClose = bigPic.querySelector('.big-picture__cancel');
const bigPicLike = bigPic.querySelector('.likes-count');
const bigPicCommentInput = bigPic.querySelector('.social__footer-text');
const bigPicCommentsCount = bigPic.querySelector('.comments-count');
const bigPicComments = bigPic.querySelector('.social__comments');
const bigPicDescription = bigPic.querySelector('.social__caption');
const bigPicCommentFragment = new DocumentFragment();

export const preview = (imgUrl, likeCount, description, comments) =>{
  bigPicImg.src = imgUrl;
  bigPicLike.textContent = likeCount;
  bigPicDescription.textContent = description;
  bigPicCommentsCount.textContent = comments.length;

  utils.openModal(bigPic);

  // Добавление коментов
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
  //const commentsCount = document.querySelector('.social__comment-count');
  //const commentsLoader = document.querySelector('.comments-loader');
  //commentsCount.classList.add('hidden');
  //commentsLoader.classList.add('hidden');

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
