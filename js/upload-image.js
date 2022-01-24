import {utils} from './utils.js';
import {uploadForm} from './backend.js';

const EFFECT_CHROME = 'chrome';
const EFFECT_SEPIA = 'sepia';
const EFFECT_MARVIN = 'marvin';
const EFFECT_HEAT = 'heat';
const EFFECT_PHOBOS = 'phobos';
const EFFECT_NONE = 'none';


export const uploadImageScript = () => {
  const form = document.querySelector('.img-upload__form');
  const uploadBtn = form.querySelector('#upload-file');
  const uploadPreviewImg = form.querySelector('.img-upload__preview img');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const closeBtn = uploadOverlay.querySelector('.img-upload__cancel');

  // Значения по умолчанию для эффектов
  const START_EFFECT_CHROME = getComputedStyle(uploadPreviewImg).getPropertyValue('--element-chrome');
  const START_EFFECT_SEPIA = getComputedStyle(uploadPreviewImg).getPropertyValue('--element-sepia');
  const START_EFFECT_MARVIN = getComputedStyle(uploadPreviewImg).getPropertyValue('--element-marvin');
  const START_EFFECT_PHOBOS = getComputedStyle(uploadPreviewImg).getPropertyValue('--element-phobos');
  const START_EFFECT_HEAT = getComputedStyle(uploadPreviewImg).getPropertyValue('--element-heat');

  // Загрузочное окно
  uploadBtn.addEventListener('change', (e) => {
    e.stopPropagation();
    utils.openModal(uploadOverlay);
  });
  closeBtn.addEventListener('click', () => {
    utils.closeModal(uploadOverlay);
  });

  document.addEventListener('keydown', e => {
    utils.isEscEvent(e, () => {
      if (document.activeElement !== hashTagInput) {
       utils.closeModal(uploadOverlay);
      }
    });
  });

  //Интенсивность эффектов
  const effectBlock = form.querySelector('.effect-level');
  const effectSlider = effectBlock.querySelector('.effect-level__slider');
  const effectPin = effectSlider.querySelector('.effect-level__pin');
  const effectValueInput = effectBlock.querySelector('.effect-level__value');
  const startEffects = () => {
    effectBlock.classList.remove('hidden');
    uploadPreviewImg.style.setProperty('--element-chrome', START_EFFECT_CHROME);
    uploadPreviewImg.style.setProperty('--element-sepia', START_EFFECT_SEPIA);
    uploadPreviewImg.style.setProperty('--element-marvin', START_EFFECT_MARVIN);
    uploadPreviewImg.style.setProperty('--element-phobos', START_EFFECT_PHOBOS);
    uploadPreviewImg.style.setProperty('--element-heat', START_EFFECT_HEAT);
    effectPin.style.left = `${effectSlider.offsetWidth}px`;
  };
  effectPin.addEventListener('mousedown', (e) => {
    e.preventDefault();

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      const moveCoords = Math.max(Math.min(moveEvt.clientX - effectSlider.getBoundingClientRect().left, effectSlider.offsetWidth), 0);
      effectPin.style.left = `${moveCoords}px`;
      effectValueInput.value = Math.round(moveCoords * 100 / effectSlider.offsetWidth);
      switch (uploadPreviewImg.dataset.effect) {
        case EFFECT_CHROME: {
          uploadPreviewImg.style.setProperty('--element-chrome', effectValueInput.value / 100);
          break;
        }
        case EFFECT_SEPIA: {
          uploadPreviewImg.style.setProperty('--element-sepia', effectValueInput.value / 100);
          break;
        }
        case EFFECT_MARVIN: {
          uploadPreviewImg.style.setProperty('--element-marvin', `${effectValueInput.value}%`);
          break;
        }
        case EFFECT_PHOBOS: {
          uploadPreviewImg.style.setProperty('--element-phobos', `${effectValueInput.value * 3 / 100}px`);
          break;
        }
        case EFFECT_HEAT: {
          uploadPreviewImg.style.setProperty('--element-heat', `${effectValueInput.value * 3 / 100}`);
          break;
        }
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Кнопки эффектов
  const effectBtns = form.querySelectorAll('.img-upload__effects [name="effect"]');
  const chromeEffectClass = 'effects__preview--chrome';
  const sepiaEffectClass = 'effects__preview--sepia';
  const marvinEffectClass = 'effects__preview--marvin';
  const heatEffectClass = 'effects__preview--heat';
  const phobosEffectClass = 'effects__preview--phobos';
  const noneEffectClass = 'effects__preview--none';
  effectBtns.forEach(element => {
    element.addEventListener('change', () => {
      switch (element.value) {
        case EFFECT_CHROME: {
          uploadPreviewImg.classList = chromeEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_CHROME;
          startEffects();
          break;
        }
        case EFFECT_SEPIA: {
          uploadPreviewImg.classList = sepiaEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_SEPIA;
            startEffects();
          break;
        }
        case EFFECT_MARVIN: {
          uploadPreviewImg.classList = marvinEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_MARVIN;
          startEffects();
          break;
        }
        case EFFECT_HEAT: {
          uploadPreviewImg.classList = heatEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_HEAT;
          startEffects();
          break;
        }
        case EFFECT_PHOBOS: {
          uploadPreviewImg.classList = phobosEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_PHOBOS;
          startEffects();
          break;
        }
        case EFFECT_NONE: {
          uploadPreviewImg.classList = noneEffectClass;
          uploadPreviewImg.dataset.effect = EFFECT_NONE;
          effectBlock.classList.add('hidden');
          break;
        }
        default: {
          uploadPreviewImg.classList = noneEffectClass;
          effectBlock.classList.add('hidden');
        }
      }
    })
  });

  /*Hash Tags*/
  const hashTagInput = form.querySelector('.text__hashtags');
  const hashTagsErrorPlace = form.querySelector('.text__hashtags-error');

  const hashTagsValidateHandler = (hashTags, isSubmit) => {
    let hashTagsErrorMessage = '';
    utils.validMessage(hashTagInput, '');

    hashTags.forEach((hash) => {
      hashTagsErrorPlace.textContent = '';
      // Проверка на количество символов хэш теге
      if (hash.length > 20){
        hashTagsErrorMessage = 'Не больше 20 символов в хеш-теге';
      }

      if(hash > 0 && !hash.match(/^#/)){
        hashTagsErrorMessage = 'Хэш-тег должен начинаться с символа';
      }

      // Проверка на спецсиволы
      if(hash.length > 1 && !/#([а-я]|[a-z]|\d|ё)+$/i.test(hash)){
        hashTagsErrorMessage = 'Спецсимволы (#, @, $ и т. п.) и символы пунктуации (тире, дефис, запятая и т. п.) нельзя';
      }
      hashTagsErrorPlace.textContent = hashTagsErrorMessage;
    });

    if(isSubmit) {
      // Проверка на дубли
      const duplicates = hashTags.filter((item, i, arr) => {return (arr.indexOf(item) !== i)});
      if (duplicates.length > 0) {
        hashTagsErrorMessage = `Удалите повторяющиеся хэш-теги`
      }
      // Проверка на количество хеш тегов
      if(hashTags > 4){
        hashTagsErrorMessage = `Не больше 5 хэш-тегов`
      }
      // Добавление валидационного сообщения
      if (hashTagsErrorMessage !== '') {
        utils.validMessage(hashTagInput, hashTagsErrorMessage);
      } else {
        return true;
      }
    }
  };

  hashTagInput.addEventListener('input', () => {
    const hashTagsInputArray = hashTagInput.value.trim().split(' ');
    hashTagsValidateHandler(hashTagsInputArray)
  });

  // Отправка формы
  //success
  const createSuccess = function () {
    const newSuccessTemplate = document.querySelector(`#success`).content;
    const newSuccess = newSuccessTemplate.querySelector(`.success`).cloneNode(true);
    document.addEventListener(`click`, function () {
      successClose(newSuccess);
    });
    document.querySelector(`main`).append(newSuccess);
    var event = new Event('change');
    var defaultEffect = form.querySelector('#effect-none');
    defaultEffect.dispatchEvent(event);
    form.reset();
    utils.closeModal(uploadOverlay);
  };
  const successClose = function (element) {
    element.remove();
  };

  //error
  const removeError = function (element) {
    element.remove();
  };
  const createError = function () {
    const newErrorTemplate = document.querySelector(`#error`).content;
    const newError = newErrorTemplate.querySelector(`.error`).cloneNode(true);
    const newErrorCloseBtn = newError.querySelector(`.error__button`);

    newErrorCloseBtn.addEventListener(`click`, function () {
      removeError(newError);
    });
    document.addEventListener(`click`, function () {
      removeError(newError);
    });
    document.querySelector(`main`).append(newError);
  };

  //upload
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const hashTagsInputArray = hashTagInput.value.split(' ');
    if (hashTagsValidateHandler(hashTagsInputArray, true)){
      uploadForm(new FormData(form), createSuccess, createError);
    }
  })

};
