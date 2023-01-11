import '../pages/index.css';
import { createElement } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation } from './validate.js';
import { set, initialCards, popupProfile, buttonEdit, buttonAdd, buttonsExit, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elements, popups } from './utils.js';

function getNewElement(element) {
  if (element) {
    const newElement = createElement(element);
    elements.prepend(newElement);
  }
};
function openImage(src, alt) {
  imagePopupImage.setAttribute('src', src);
  imagePopupImage.setAttribute('alt', alt);
  subtitlePopupImage.textContent = alt;
  openPopup(popupImage);
};

function saveElement(evt) {
  evt.preventDefault();
  if (newElementTitle.value && newElementLink.value) {
    const element = {};
    element['name'] = newElementTitle.value;
    element['link'] = newElementLink.value;
    getNewElement(element);
    closePopup(popupElement);
  }
};
function openPopupPorfile() {
  profileTitleNew.value = profileTitle.textContent;
  profileSubtitleNew.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};
function saveProfile(evt) {
  evt.preventDefault();
  if (profileTitleNew.value && profileSubtitleNew.value) {
    profileTitle.textContent = profileTitleNew.value;
    profileSubtitle.textContent = profileSubtitleNew.value;
    closePopup(popupProfile);
  }
};

function closePopupByEsc(evt) {
  if (evt.keyCode == 27) {
    closePopup(document.querySelector('.popup_opened'));
  }
};

popups.forEach((item) => {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target === item) {
      closePopup(item);
    }
  })
});

buttonEdit.addEventListener('click', openPopupPorfile);

popupProfile.addEventListener('submit', saveProfile);

buttonAdd.addEventListener('click', () => {
  openPopup(popupElement);
});

buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach(getNewElement);
popupElement.addEventListener('submit', saveElement);

enableValidation(set);

export { createElement, closePopupByEsc, openImage };

