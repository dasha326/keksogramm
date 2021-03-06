import {utils} from './utils.js';
import {preview} from './preview.js';
import {filter} from './filter.js';

export const gallery = (images, notFirstTime) =>{
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
      preview(item.url, item.likes, item.description, item.comments);
    });
    picFragment.append(newPic);
  });

  picWrapper.innerHTML = '';
  picWrapper.append(picFragment);

  if(!notFirstTime) {
    filter(images);
  }
};
