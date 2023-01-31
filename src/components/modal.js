function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'));
    }
  };

export function openPopup(evt) {
    evt.classList.add('popup_opened');
    window.addEventListener('keydown', closePopupByEsc);
};
export function closePopup(evt) {
    evt.classList.remove('popup_opened');
    window.removeEventListener('keydown', closePopupByEsc); 
};
