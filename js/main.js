'use strict';

(() => {
  const randomizer = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };
  const names = ['Святогор', 'Пафнутий', 'Тамара', 'Василиса', 'Радриго', 'Ярило'];
  const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const randomComments = () => {
    return Array.from({length: randomizer(2,6)}, () => {
      return {
        avatar: `img/avatar-${randomizer(1, 6)}.svg`,
        message: `${messages[randomizer(0, messages.length - 1)]}`,
        name: `${names[randomizer(0, names.length -1)]}`
      }
    });
  };

  const array = Array.from({length: 25}, (item, i) => {
    return {
      url: `photos/${i+1}.svg`,
      description: 'Описание',
      likes: randomizer(15, 200),
      comments: randomComments()
    };
  });

  const picWrapper = document.querySelector('.pictures');
  const picFragment = new DocumentFragment();
  const picTemplate = document.querySelector('#picture').content;
  array.forEach(item => {
    const newPic = picTemplate.querySelector('.picture').cloneNode(true);
    const img = newPic.querySelector('.picture__img');
    const likes = newPic.querySelector('.picture__likes');
    const comments = newPic.querySelector('.picture__comments');
    img.src = item.url;
    likes.textContent = item.likes;
    comments.textContent = item.comments.length;
    picFragment.append(newPic);
  });
  picWrapper.append(picFragment);

  // DZ 2
  const bigPic = document.querySelector('.big-picture');
  const bigPicImg = bigPic.querySelector('.big-picture__img img');
  const bigPicLike = bigPic.querySelector('.likes-count');
  const bigPicCommentsCount = bigPic.querySelector('.comments-count');
  const bigPicComments = bigPic.querySelector('.social__comments');
  const bigPicDescription = bigPic.querySelector('.social__caption');
  const bigPicCommentFragment = new DocumentFragment();

  bigPicImg.src = array[0].url;
  bigPicLike.textContent = array[0].likes;
  bigPicCommentsCount.textContent = array[0].comments.length;
  bigPicDescription.textContent =  array[0].description;

  array[0].comments.forEach(item => {
    const bigPicComment = bigPic.querySelector('.social__comment').cloneNode(true);
    const bigPicCommentsImg = bigPicComments.querySelector('img');
    const bigPicCommentsText = bigPicComments.querySelector('.social__text');
    bigPicCommentsImg.src = item.avatar;
    bigPicCommentsImg.alt = item.name;
    bigPicCommentsText.textContent = item.message;
    bigPicCommentFragment.append(bigPicComment);
  });

  while (bigPicComments.firstChild) {
    bigPicComments.removeChild(bigPicComments.firstChild);
  }
  bigPicComments.append(bigPicCommentFragment);

  const openBigImg = () => {
    bigPic.classList.remove('hidden');
    const commentsCount = document.querySelector('.social__comment-count');
    const commentsLoader = document.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  };
  openBigImg();
})();
