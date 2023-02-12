import '../pages/index.css';
import { createElement } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import FormValidator from '../components/FormValidator.js';
import { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, 
  newElementForm, profileEditForm, popupProfileName, popupAvatarName, buttonEdit, buttonAdd,
   buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, 
   popupElementName, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage,
   elements, popups, cardSubmitButton } from '../utils/utils.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
//import PopupWithImage from './PopupWithImage'; //popupImage.querySelector('.popup__image')

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

//включаем кнопки закрытия
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupElement.setEventListeners();

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    profile.id = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);

    cards.forEach((card) => {
      const hostCard = createElement(card, profile);
      elements.append(hostCard);
    });
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
      elements.prepend(createElement(element, profile));
      closePopup(newElementId);
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