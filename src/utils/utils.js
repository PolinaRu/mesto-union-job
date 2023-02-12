const set = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
  
const elements = document.querySelector('.elements__list');
const elementImage = elements.querySelector('.element__image');
const elementTitle = elements.querySelector('.element__title');
const popupProfileName = '.popup-profile';
const popupAvatarName = '.popup-avatar';
const buttonEdit = document.querySelector('.profile__button_making_edit');
const buttonAdd = document.querySelector('.profile__button_making_add');
const buttonsExit = document.querySelectorAll('.popup__button_making_exit');
const profileAvatar = '.profile__avatar-img';
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileTitleNew = document.querySelector('#profile-title');
const profileSubtitleNew = document.querySelector('#profile-subtitle');
const popupElementName = '.popup-element';
const newElementTitle = document.querySelector('#element-title');
const newElementLink = document.querySelector('#element-link');
const popupImage = '.popup-image';
const imagePopupImage = '.popup__image';
const subtitlePopupImage = '.popup__subtitle';
const elementTemplate = document.querySelector('#elementTemplate').content;
const popups = document.querySelectorAll('.popup');
const cardSubmitButton = document.querySelector('#submitButton');
const buttonAvatar = document.querySelector('#avatarSubmit');
const avatarForm = document.querySelector('#avatarEditForm');
const avatarLink = document.querySelector('#avatar-link');
const profile = document.querySelector('#profileId');
const buttonEditAvatar = document.querySelector('#buttonEditAvatar');
const newElementId = document.querySelector('#newElementId');
export const newElementForm = document.querySelector('#popupForm');
export const profileEditForm = document.querySelector('#profileEdit');
export { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, buttonAvatar, popupAvatarName, elements, elementImage, elementTitle, popupProfileName, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElementName, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elementTemplate, popups, cardSubmitButton };