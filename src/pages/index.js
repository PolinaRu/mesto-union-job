import './index.css';
import {
  set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm,
  newElementForm, profileEditForm, popupProfile, popupAvatarName, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElement, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elements, popups, cardSubmitButton
} from '../utils/utils.js';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({ config });
const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
const validateFormCard = new FormValidator(set, newElementForm);
const validateFormProfile = new FormValidator(set, profileEditForm);
const validateFormAvatar = new FormValidator(set, avatarForm);
const popupAvatar = new PopupWithImage(popupAvatarName);

//включаем кнопки закрытия
popupAvatar.setEventListeners();

let section;
let newElement;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about);
    section = new Section({
      items: cards,
      renderer: (item) => {
        newElement = createElement(item);
        section.setItem(newElement);
      }
    }, '.elements');
    section.renderItems();
    })

  .catch((err) => {
    console.error(err);
  });





const editAvatar = new PopupWithForm ('.popup-profile', (evt, getInputs) => {
  super.handleSubmit(this._makeRequest);}
  
  _makeRequest() {
    return api.editProfileAvatar(avatarLink.value).then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
  })
  

avatarForm.addEventListener('submit', editAvatar);

buttonEditAvatar.addEventListener('click', function () {
  popupAvatar.open();
});



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
