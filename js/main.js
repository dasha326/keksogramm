'use strict';

(function() {
  function randomizer(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  let array = [];
  let names = ['Святогор', 'Пафнутий', 'Тамара', 'Василиса', 'Радриго', 'Ярило'];
  let messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  let randomComments = [];
  for (let x = 0; x < randomizer(2,6); x++) {
    randomComments[x] = {
      avatar: `img/avatar-${randomizer(1, 6)}.svg`,
      message: `${messages[randomizer(0, messages.length)]}`,
      name: `${names[randomizer(0, names.length)]}`
    }
  }
  for (let i = 0; i < 25; i++) {
    array[i] = {
      url: `photos/${i}.svg`,
      description: 'Описание',
      likes: randomizer(15, 200),
      comments: randomComments
    };

  }
  const picWrapper = document.querySelector('.pictures');
  const picFragment = new DocumentFragment();
  const picTemplate = document.querySelector('#picture').content;
  for (let j = 0; j < array.length; j++){
    const newPic = picTemplate.querySelector('.picture').cloneNode(true);
    const img = newPic.querySelector('.picture__img');
    const likes = newPic.querySelector('.picture__likes');
    const comments = newPic.querySelector('.picture__comments');
    img.src = array[j].url;
    likes.textContent = array[j].likes;
    comments.textContent = array[j].comments.length;
    console.log(newPic);
    picFragment.append(newPic);
  }
  picWrapper.append(picFragment);
})();
