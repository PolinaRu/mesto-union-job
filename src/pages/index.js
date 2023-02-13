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
 
const cardList = new Section({
  data: [],
  renderer: (item) => {    
    cardList.setItem(createCard(item));
  }
}, elements);

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
function handleSubmit (request, {data}, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request({data})
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, submitButton, initialText);
  });
}

function editAvatar(evt, data) {
  function makeRequest({data}) {
    return api.editProfileAvatar(data.avatar__link).then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    });
  }
  handleSubmit(makeRequest, {data}, evt);
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

function addNewElement(evt, data) {
  function makeRequest({data}) {
    return api.postNewElement(data.element__title, data.element__link).then((element) => {
      cardList.prependItem(createCard(element));
      popupElement.close();
    });
  }
  handleSubmit(makeRequest, {data}, evt);
}

function saveProfile(evt, data) {
  function makeRequest({data}) {
    return api.editProfile(data.profile__title, data.profile__subtitle).then((res) => {
      userInfo.setUserInfo(data.profile__title, data.profile__subtitle);
      popupProfile.close();
    });
  }
  handleSubmit(makeRequest, {data}, evt);
}

buttonEdit.addEventListener('click', openPopupPorfile);
buttonAdd.addEventListener('click', () => {
  popupElement.open();
});

// включаем валидацию
validateFormAvatar.enableValidation();
validateFormProfile.enableValidation();
validateFormCard.enableValidation();