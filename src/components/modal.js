import { profileTitle, profileTitleNew, profileSubtitle, profileSubtitleNew, popupProfile, popup } from "./utils";

function openPopup(evt) {
    evt.classList.add('popup_opened');
};
function closePopup(evt) {
    evt.classList.remove('popup_opened');
};
function openPopupPorfile() {
    profileTitleNew.value = profileTitle.textContent;
    profileSubtitleNew.value = profileSubtitle.textContent;
    openPopup(popupProfile);
};
function saveProfile(evt) {
    evt.preventDefault();
    if (profileTitleNew.value && profileSubtitleNew.value) {
        profileTitle.textContent = profileTitleNew.value;
        profileSubtitle.textContent = profileSubtitleNew.value;
        closePopup(popupProfile);
    }
};
popup.forEach((item) => {
    item.addEventListener('mousedown', function (evt) {
        if (evt.target === item) {
            closePopup(item);
        }
    })
});
window.onkeydown = function (event) {
    if (event.keyCode == 27) {
        closePopup(document.querySelector('.popup_opened'));
    }
};


export { openPopup, closePopup, openPopupPorfile, saveProfile };