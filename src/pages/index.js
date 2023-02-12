import '../pages/index.css';
import { createElement } from '../components/card.js';
import { closePopup } from '../components/modal.js';
import FormValidator from '../components/FormValidator.js';
import { set, buttonEditAvatar, profile, avatarLink, avatarForm, 
  newElementForm, profileEditForm, popupProfileName, popupAvatarName, buttonEdit, buttonAdd,
   profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, 
   popupElementName, newElementTitle, newElementLink,
   imagePopupImage, popupImage, subtitlePopupImage, 
   elements, popups, elementTemplate } from '../utils/utils.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section';
import Card from '../components/Card1';
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
 
const cardList = new Section({
  data: [],
  renderer: (item) => {
    const card = new Card(item, profile.id, popupImg.open.bind(popupImg), api.putLike.bind(api), api.unputLike.bind(api), api.deleteMyElement.bind(api), elementTemplate);
    const cardElement = card.generate();
    cardList.setItem(cardElement);
  }
}, elements);

//включаем кнопки закрытия
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupElement.setEventListeners();
popupImg.setEventListeners();

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    profile.id = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);

    cardList.setInitData(cards);
    cardList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

function renderLoading (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}
function handleSubmit (request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
  .then(() => {
    evt.target.reset();
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, submitButton, initialText);
  });
}

function editAvatar(evt) {
  function makeRequest() {
    return api.editProfileAvatar(avatarLink.value).then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    });
  }
  handleSubmit(makeRequest, evt);
}

buttonEditAvatar.addEventListener('click', function () {
  popupAvatar.open();
  });

function openPopupPorfile() {
  const user = userInfo.getUserInfo();
  profileTitleNew.value = user.name;
  profileSubtitleNew.value = user.about;
  popupProfile.open();
};

function addNewElement(evt) {
  function makeRequest() {
    return api.postNewElement(newElementTitle.value, newElementLink.value).then((element) => {
      const card = new Card(element, profile.id, popupImg.open.bind(popupImg), api.putLike.bind(api), api.unputLike.bind(api), api.deleteMyElement.bind(api), elementTemplate);
      const cardElement = card.generate();
      cardList.setItem(cardElement);
      popupElement.close();
    });
  }
  handleSubmit(makeRequest, evt);
}

function saveProfile(evt) {
  function makeRequest() {
    return api.editProfile(profileTitleNew.value, profileSubtitleNew.value).then((res) => {
      userInfo.setUserInfo(profileTitleNew.value, profileSubtitleNew.value);
      popupProfile.close();
    });
  }
  handleSubmit(makeRequest, evt);
}

popups.forEach((item) => {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target === item) {
      closePopup(item);
    }
  })
});

buttonEdit.addEventListener('click', openPopupPorfile);
buttonAdd.addEventListener('click', () => {
  newElementTitle.value = "";
  newElementLink.value = "";
  popupElement.open();
});

// включаем валидацию
validateFormAvatar.enableValidation();
validateFormProfile.enableValidation();
validateFormCard.enableValidation();

export { addNewElement };