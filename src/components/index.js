import '../pages/index.css';
import { addLike, getNewElement, removeElement } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation } from './validate.js';
import { set, initialCards, popupProfile, buttonEdit, buttonAdd, buttonsExit, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elementTemplate, popups } from './utils.js';

function openImage(src, alt) {
  imagePopupImage.setAttribute('src', src);
  imagePopupImage.setAttribute('alt', alt);
  subtitlePopupImage.textContent = alt;
  openPopup(popupImage);
};

function createElement(element) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  newElement.querySelector('.element__title').textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.name;
  newElement.querySelector('.like').addEventListener('click', addLike);
  newElement.querySelector('.element__button_remove').addEventListener('click', removeElement);
  elementImage.addEventListener('click', () => {openImage(element.link, element.name)});
  return newElement;
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

export { createElement, closePopupByEsc };

