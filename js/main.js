import {utils} from './utils.js';
import {uploadImageScript} from './upload-image.js';
import {imagesBoard} from './images-board.js';

(() => {
  const names = ['Святогор', 'Пафнутий', 'Тамара', 'Василиса', 'Радриго', 'Ярило'];
  const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const randomComments = () => {
    return Array.from({length: utils.randomizer(2,6)}, () => {
      return {
        avatar: `img/avatar-${utils.randomizer(1, 6)}.svg`,
        message: `${messages[utils.randomizer(0, messages.length - 1)]}`,
        name: `${names[utils.randomizer(0, names.length -1)]}`
      }
    });
  };

  const arrayImages = Array.from({length: 25}, (item, i) => {
    return {
      url: `photos/${i+1}.jpg`,
      description: 'Описание',
      likes: utils.randomizer(15, 200),
      comments: randomComments()
    };
  });

  imagesBoard(arrayImages);

  uploadImageScript();
})();
