import {utils} from './utils.js';
import {gallery} from './gallery.js';

const BTN_ID_DEFAULT = 'filter-default';
const BTN_ID_RANDOM = 'filter-random';
const BTN_ID_DISCUSSED = 'filter-discussed';

export const filter = (images) => {
  const filter = document.querySelector('.img-filters');
  const filterButtons = filter.querySelectorAll('.img-filters__button');
  const activeClass = 'img-filters__button--active';

  const baseImages = images;
  const discussedImages = [...images].sort((a, b) => {return b.comments.length - a.comments.length;});
  const randomImages = () => {
    let currentArr = [...images];
    let randomImagesArr = [];
    for (let i = 0; i < 10; i++) {
      const delItem = currentArr[utils.randomizer(0, currentArr.length - 1)];
      currentArr.splice(currentArr.indexOf(delItem), 1);
      randomImagesArr.push(delItem);
    }
    return randomImagesArr
  };

  filter.classList.remove('img-filters--inactive');


  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector(`.${activeClass}`).classList.remove(activeClass);
      btn.classList.add(activeClass);
      switch (btn.id) {
        case BTN_ID_DEFAULT: {
          gallery(baseImages, true);
          break;
        }
        case BTN_ID_RANDOM: {
          gallery(randomImages(), true);
          break;
        }
        case BTN_ID_DISCUSSED: {
          gallery(discussedImages, true);
          break;
        }
      }
    })
  });
};
