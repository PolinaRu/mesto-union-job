import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import { set, buttonEditAvatar, profile, avatarLink, avatarForm, 
  newElementForm, profileEditForm, popupProfileName, popupAvatarName, buttonEdit, buttonAdd,
   profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, 
   popupElementName, newElementTitle, newElementLink,
   imagePopupImage, popupImage, subtitlePopupImage, 
   elements, elementTemplate } from '../utils/constants.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "761944ff-ca64-4e82-a14c-fe8b959c12ae",
    "Content-Type": "application/json",
  }
}); 
const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
const validateFormCard = new FormValidator(set, newElementForm);
const validateFormProfile = new FormValidator(set, profileEditForm);
const validateFormAvatar = new FormValidator(set, avatarForm);
const popupAvatar = new PopupWithForm(popupAvatarName, editAvatar);
const popupProfile = new PopupWithForm(popupProfileName, saveProfile);
const popupElement = new PopupWithForm(popupElementName, addNewElement);
const popupImg = new PopupWithImage(popupImage, imagePopupImage, subtitlePopupImage);
 

function createCard(item) {
  const card = new Card(item, profile.id, popupImg.open.bind(popupImg), api.putLike.bind(api), api.unputLike.bind(api), api.deleteMyElement.bind(api), elementTemplate);
  const cardElement = card.generate();
  return cardElement;
}

//включаем кнопки закрытия
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupElement.setEventListeners();
popupImg.setEventListeners();

const cardList = new Section({
  data: [],
  renderer: (item) => {    
    cardList.setItem(createCard(item));
  }
}, elements);

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    profile.id = user._id;
    userInfo.setUserInfo(user);
    cardList.setInitData(cards);
    cardList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

 function editAvatar(evt, data) {
  function makeRequest() {
    return api.editProfileAvatar(data.avatar__link).then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    });
  }
  popupAvatar.handleSubmitRender(makeRequest, {data}, evt);
}

 
  buttonEditAvatar.addEventListener('click', function () {
    popupAvatar.open();
    });
 
  function openPopupProfile() {
    const user = userInfo.getUserInfo();
    popupProfile.setInputValues(user);
    popupProfile.open();
  };
 
  function addNewElement(evt, data) {
    function makeRequest() {
      return api.postNewElement(data.element__title, data.element__link).then((element) => {
        cardList.prependItem(createCard(element));
        popupElement.close();
      });
    }
    popupElement.handleSubmitRender(makeRequest, {data}, evt);
  }
 
  function saveProfile(evt, data) {
    function makeRequest() {
      return api.editProfile(popupProfile.getInputValues()).then((res) => {
        userInfo.setUserInfo(res);
        popupProfile.close();
      });
    }
    popupProfile.handleSubmitRender(makeRequest, {data}, evt);
  }
 
  buttonEdit.addEventListener('click', openPopupProfile);
  buttonAdd.addEventListener('click', () => {
    popupElement.open();
  });
 
  // включаем валидацию
  validateFormAvatar.enableValidation();
  validateFormProfile.enableValidation();
  validateFormCard.enableValidation();
