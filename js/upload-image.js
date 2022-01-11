'use strict';

(() => {
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadBtn = uploadForm.querySelector('#upload-file');
  const closeBtn = window.uploadOverlay.querySelector('.img-upload__cancel');
  const effectBtns = uploadForm.querySelectorAll('.img-upload__effects [name="effect"]');
  const uploadPreviewImg = uploadForm.querySelector('.img-upload__preview img');
  const t = uploadForm.querySelector('.effect-level__pin');
  const chromeEffectClass = 'effects__preview--chrome';
  const sepiaEffectClass = 'effects__preview--sepia';
  const marvinEffectClass = 'effects__preview--marvin';
  const heatEffectClass = 'effects__preview--heat';
  const phobosEffectClass = 'effects__preview--phobos';
  const noneEffectClass = 'effects__preview--none';
  const hashTagInput = uploadForm.querySelector('.text__hashtags');

  uploadBtn.addEventListener('change', () => {
    window.utils.openModalUpload();
  });
  closeBtn.addEventListener('click', () => {
    window.utils.closeModalUpload();
  });
  document.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.img-upload__wrapper');
    if (!document.querySelector('.img-upload__overlay').contains(wrapper)) {closeBtn.click()}
  });
  document.addEventListener('keydown', e => {
    window.utils.isEscEvent(e, () => {
      if (document.activeElement !== hashTagInput) {
        closeBtn.click();
      }
    });
  });

  const addImage = () => {

  };

  effectBtns.forEach(element => {
    element.addEventListener('change', () => {
      console.log(element.value);
      switch (element.value) {
        case 'chrome': {
          uploadPreviewImg.classList = chromeEffectClass;
          break;
        }
        case 'sepia': {
          uploadPreviewImg.classList = sepiaEffectClass;
          break;
        }
        case 'marvin': {
          uploadPreviewImg.classList = marvinEffectClass;
          break;
        }
        case 'heat': {
          uploadPreviewImg.classList = heatEffectClass;
          break;
        }
        case 'phobos': {
          uploadPreviewImg.classList = phobosEffectClass;
          break;
        }
        case 'none': {
          uploadPreviewImg.classList = noneEffectClass;
          break;
        }
        default: {
          uploadPreviewImg.classList = noneEffectClass;
        }
      }
    })
  });

  /*Hash Tags*/
  const hashTagsErrorPlace = uploadForm.querySelector('.text__hashtags-error');
  const maxHashTagsMessage = 'Нельзя указать больше 5 хэш-тегов';

  const hashTagsValidateHandler = (hashTags, isSubmit) => {
    let hashTagsErrorMessage = '';
    window.utils.validMessage(hashTagInput, '');

    hashTags.forEach((hash) => {
      hashTagsErrorPlace.textContent = '';
      // Проверка на количество символов хэш теге
      if (hash.length > 20){
        hashTagsErrorMessage = 'Не больше 20 символов в хеш-теге';
      }

      if(!hash.match(/^#/)){
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
        window.utils.validMessage(hashTagInput, hashTagsErrorMessage);
      }
    }
  };

  hashTagInput.addEventListener('input', () => {
    const hashTagsInputArray = hashTagInput.value.trim().split(' ');
    hashTagsValidateHandler(hashTagsInputArray)
  });
  uploadForm.addEventListener('submit', (e) => {
    const hashTagsInputArray = hashTagInput.value.split(' ');
    hashTagsValidateHandler(hashTagsInputArray, true);
    e.preventDefault();
  })
})();
