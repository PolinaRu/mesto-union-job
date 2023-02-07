import '../pages/index.css';
import { createElement } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { FormValidator } from './Validate.js';
import { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, 
  newElementForm, profileEditForm, popupProfile, popupAvatarName, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elements, popups, cardSubmitButton } from './utils.js';
import { Api } from './Api.js';
import { UserInfo } from './UserInfo';
import { Popup } from './Popup';

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
const popupAvatar = new Popup(popupAvatarName);

//включаем кнопки закрытия
popupAvatar.setEventListeners();

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

avatarForm.addEventListener('submit', editAvatar);

buttonEditAvatar.addEventListener('click', function () {
  popupAvatar.open();
  });

function openImage(src, alt) {
  imagePopupImage.src = src.src;
  imagePopupImage.alt = alt.alt;
  subtitlePopupImage.textContent = alt.textContent;
  openPopup(popupImage);
};

function openPopupPorfile() {
  const user = userInfo.getUserInfo();
  profileTitleNew.value = user.name;
  profileSubtitleNew.value = user.about;
  openPopup(popupProfile);
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
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closePopup(popupProfile);
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
popupProfile.addEventListener('submit', saveProfile);
buttonAdd.addEventListener('click', () => {
  newElementTitle.value = "";
  newElementLink.value = "";
  openPopup(popupElement);
});

/*buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});*/

popupElement.addEventListener('submit', addNewElement);

// включаем валидацию
validateFormAvatar.enableValidation();
validateFormProfile.enableValidation();
validateFormCard.enableValidation();

export { createElement, openImage, addNewElement };