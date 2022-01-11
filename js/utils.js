const ESC_KEYCODE = 'Escape';
const ENTER_KEYCODE = 'Enter';
const DEBOUNCE_INTERVAL = 300;

let currentPopup;

const clickNoPopupHandler = function(e) {
  if (!currentPopup.contains(e.target) || (currentPopup === e.target)) {
    utils.closeModal(currentPopup);
  }
};

export const utils = {
  randomizer(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  },
  isEscEvent(e, action, param) {
    if (e.key === ESC_KEYCODE) {
      action(param);
    }
  },
  openModal(popup) {
    popup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    currentPopup = popup;
    document.addEventListener('click', clickNoPopupHandler)
  },
  closeModal(popup) {
    popup.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    //window.popup.reset();
    document.removeEventListener('click', clickNoPopupHandler)

  },
  validMessage(element, message) {
    element.setCustomValidity(message);
  },
};
