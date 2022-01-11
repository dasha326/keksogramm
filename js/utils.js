'use strict';

(() => {
  const ESC_KEYCODE = 'Escape';
  const ENTER_KEYCODE = 'Enter';
  const DEBOUNCE_INTERVAL = 300;
  window.uploadOverlay = document.querySelector('.img-upload__overlay');
  window.uploadForm = document.querySelector('.img-upload__form');

  window.utils = {
    isEscEvent(e, action, param) {
      if (e.key === ESC_KEYCODE) {
        action(param);
      }
    },
    openModalUpload() {
      uploadOverlay.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
    },
    closeModalUpload() {
      uploadOverlay.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      window.uploadForm.reset();
    },
    validMessage(element, message) {
      element.setCustomValidity(message);
    },
  }
})();
