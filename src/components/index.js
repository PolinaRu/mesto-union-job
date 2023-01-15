import '../pages/index.css';
import { createElement, countLike } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, blockSubmitButton } from './validate.js';
import { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, buttonAvatar, popupProfile, popupAvatar, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elements, popups, cardSubmitButton } from './utils.js';
import { getInitialCards, getUser, editProfileAvatar, editProfile, postNewElement, deleteMyElement, putLike, unputLike } from './api.js';

Promise.all([getUser(), getInitialCards()])
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

function editAvatar(evt) {
  evt.preventDefault();
  buttonAvatar.textContent = 'Сохранение...';
  const avatarValue = avatarLink.value;
  editProfileAvatar(avatarValue).then((user) => {
    profileAvatar.src = user.avatar;
    profileAvatar.alt = user.avatar;
    closePopup(popupAvatar);
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonAvatar.textContent = "Сохранить";
    });
}
avatarForm.addEventListener('submit', editAvatar);

buttonEditAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
  });

function openImage(src, alt) {
  imagePopupImage.src = src.src;
  imagePopupImage.alt = alt.alt;
  subtitlePopupImage.textContent = alt.textContent;
  openPopup(popupImage);
};

function saveElement(evt) {
  evt.preventDefault();
  if (newElementTitle.value && newElementLink.value) {
    const element = {};
    element['name'] = newElementTitle.value;
    element['link'] = newElementLink.value;
    postNewElement(element.name, element.link);
    closePopup(popupElement);
  }
};
function openPopupPorfile() {
  profileTitleNew.value = profileTitle.textContent;
  profileSubtitleNew.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};


function addNewElement(evt) {
  evt.preventDefault();

  cardSubmitButton.textContent = "Создание...";
  postNewElement(imagePopupImage.value, subtitlePopupImage.value)
    .then((element) => {
      document.querySelector('#poupForm').reset();
      elements.prepend(createElement(element, profile));
      closePopup(newElementId);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = "Создать";
    });
};

function addLike(element, card, profile) {
  putLike(card._id)
      .then((data) => {
          countLike(element, data.likes, profile);
      })
      .catch((err) => {
          console.error(err);
      });
}
function removeLike(element, card, profile) {
  unputLike(card._id)
      .then((data) => {
          countLike(element, data.likes, profile);
      })
      .catch((err) => {
          console.error(err);
      });
}
function deleteCard(element, card, profile) {
  deleteMyElement(card._id)
      .then((data) => {
          countLike(element, data.likes, profile);
      })
      .catch((err) => {
          console.error(err);
      });
}

function saveProfile(evt) {
  evt.preventDefault();
  buttonAdd.textContent = 'Сохранение...';
  profileTitle.textContent = profileTitleNew.value;
  profileSubtitle.textContent = profileSubtitleNew.value;
  editProfile(profileTitleNew.value, profileSubtitleNew.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonAdd.textContent = "Сохранить";
    });
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
  newElementTitle.value = "";
  newElementLink.value = "";
  openPopup(popupElement);
  blockSubmitButton(set, cardSubmitButton);
});

buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupElement.addEventListener('submit', saveElement);

enableValidation(set);

export { createElement, deleteCard, closePopupByEsc, openImage, addLike, removeLike, addNewElement };

