import '../pages/index.css';
import { newElement, saveElement } from './card.js';
import { openPopup, closePopup, openPopupPorfile, saveProfile } from './modal.js';
import { enableValidation } from './validate';
import { set, initialCards, popupProfile, buttonEdit, buttonAdd, buttonsExit, popupElement } from './utils';

buttonEdit.addEventListener('click', openPopupPorfile);

popupProfile.addEventListener('submit', saveProfile);

buttonAdd.addEventListener('click', () => {
  openPopup(popupElement);
});

buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach(newElement);
popupElement.addEventListener('submit', saveElement);

enableValidation(set);

