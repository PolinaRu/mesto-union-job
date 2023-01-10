import { elements, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elementTemplate } from "./utils";
import { openPopup, closePopup } from './modal.js';

function addLike(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('like_active');
};
function createElement(element) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    newElement.querySelector('.element__title').textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;
    newElement.querySelector('.like').addEventListener('click', addLike);
    newElement.querySelector('.element__button_remove').addEventListener('click', removeElement);
    elementImage.addEventListener('click', (evt) => { openImage(elementImage.src, elementImage.alt); });
    return newElement;
};
function newElement(element) {
    if (element) {
        const newElement = createElement(element);
        elements.prepend(newElement);
    }
};
function saveElement(evt) {
    evt.preventDefault();
    if (newElementTitle.value && newElementLink.value) {
        const element = {};
        element['name'] = newElementTitle.value;
        element['link'] = newElementLink.value;
        newElement(element);
        closePopup(popupElement);
    }
};
function removeElement(evt) {
    evt.target.closest('.element').remove();
};
function openImage(src, alt) {
    openPopup(popupImage);
    imagePopupImage.setAttribute('src', src);
    imagePopupImage.setAttribute('alt', alt);
    subtitlePopupImage.textContent = alt;
};

export { addLike, createElement, newElement, saveElement, removeElement, openImage }; 
