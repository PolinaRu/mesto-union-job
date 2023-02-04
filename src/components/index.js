import '../pages/index.css';
import { createElement } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { FormValidator } from './validate.js';
import { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, popupProfile, popupAvatar, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elements, popups, cardSubmitButton } from './utils.js';
import { Api } from './api.js';

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "761944ff-ca64-4e82-a14c-fe8b959c12ae",
    "Content-Type": "application/json",
  }
}); 

const validateFormCard = new FormValidator(set, avatarForm);
const validateFormProfile = new FormValidator(set, avatarForm);
const validateFormAvatar = new FormValidator(set, avatarForm);

validateFormAvatar.enableValidation();

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    profile.id = user._id;
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
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
      profileAvatar.src = res.avatar;
      closePopup(popupAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

avatarForm.addEventListener('submit', editAvatar);

buttonEditAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
  //blockSubmitButton(set, cardSubmitButton);
  });

function openImage(src, alt) {
  imagePopupImage.src = src.src;
  imagePopupImage.alt = alt.alt;
  subtitlePopupImage.textContent = alt.textContent;
  openPopup(popupImage);
};

function openPopupPorfile() {
  profileTitleNew.value = profileTitle.textContent;
  profileSubtitleNew.value = profileSubtitle.textContent;
  openPopup(popupProfile);
  //blockSubmitButton(set, cardSubmitButton);
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
  //blockSubmitButton(set, cardSubmitButton);
});

buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupElement.addEventListener('submit', addNewElement);

//enableValidation(set);

export { createElement, openImage, addNewElement };