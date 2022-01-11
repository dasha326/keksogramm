import {utils} from './utils.js';

export const imagesBoard = (images) =>{
  const picWrapper = document.querySelector('.pictures');
  const picFragment = new DocumentFragment();
  const picTemplate = document.querySelector('#picture').content;
  images.forEach(item => {
    const newPic = picTemplate.querySelector('.picture').cloneNode(true);
    const img = newPic.querySelector('.picture__img');
    const likes = newPic.querySelector('.picture__likes');
    const comments = newPic.querySelector('.picture__comments');
    img.src = item.url;
    likes.textContent = item.likes;
    comments.textContent = item.comments.length;
    newPic.addEventListener('click', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      openBigPic(item.url, item.likes, item.description, item.comments);
    });
    picFragment.append(newPic);
  });
  picWrapper.append(picFragment);

  // Big image popup
  const bigPic = document.querySelector('.big-picture');
  const bigPicImg = bigPic.querySelector('.big-picture__img img');
  const bigPicClose = bigPic.querySelector('.big-picture__cancel');
  const bigPicLike = bigPic.querySelector('.likes-count');
  const bigPicCommentInput = bigPic.querySelector('.social__footer-text');
  const bigPicCommentsCount = bigPic.querySelector('.comments-count');
  const bigPicComments = bigPic.querySelector('.social__comments');
  const bigPicDescription = bigPic.querySelector('.social__caption');
  const bigPicCommentFragment = new DocumentFragment();

  const openBigPic = (imgUrl, likeCount, description, comments) => {
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
    bigPicComments.append(bigPicCommentFragment);
    //const commentsCount = document.querySelector('.social__comment-count');
    //const commentsLoader = document.querySelector('.comments-loader');
    //commentsCount.classList.add('hidden');
    //commentsLoader.classList.add('hidden');

  };

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

  // while (bigPicComments.firstChild) {
  //   bigPicComments.removeChild(bigPicComments.firstChild);
  // }
  //

};
