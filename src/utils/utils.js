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
const popupProfile = document.querySelector('.popup-profile');
const popupAvatarName = '.popup-avatar';
const buttonEdit = document.querySelector('.profile__button_making_edit');
const buttonAdd = document.querySelector('.profile__button_making_add');
const buttonsExit = document.querySelectorAll('.popup__button_making_exit');
const profileAvatar = '.profile__avatar-img';
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileTitleNew = document.querySelector('#profile-title');
const profileSubtitleNew = document.querySelector('#profile-subtitle');
const popupElement = document.querySelector('.popup-element');
const popupElementContainer = popupElement.querySelector('.popup__container');
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
const newElementForm = document.querySelector('#popupForm');
const profileEditForm = document.querySelector('#profileEdit');

const config = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-18/',
    headers: {
        authorization: '761944ff-ca64-4e82-a14c-fe8b959c12ae',
        'Content-Type': 'application/json',
    },
};

export { set, config, profileEditForm, newElementForm, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, buttonAvatar, popupAvatarName, elements, elementImage, elementTitle, popupProfile, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, popupElementContainer, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elementTemplate, popups, cardSubmitButton };