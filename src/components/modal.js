import {closePopupByEsc} from './index.js';


function openPopup(evt) {
    evt.classList.add('popup_opened');
    window.addEventListener('keydown', closePopupByEsc);
};
function closePopup(evt) {
    evt.classList.remove('popup_opened');
    window.removeEventListener('keydown', closePopupByEsc); 
};

export { openPopup, closePopup };