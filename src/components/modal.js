import {closePopupByEsc} from './index.js';
import { blockSubmitButton } from './validate.js';
import { set, cardSubmitButton } from './utils.js';

function openPopup(evt) {
    evt.classList.add('popup_opened');
    window.addEventListener('keydown', closePopupByEsc);
    blockSubmitButton(set, cardSubmitButton);
};
function closePopup(evt) {
    evt.classList.remove('popup_opened');
    window.removeEventListener('keydown', closePopupByEsc); 
};

export { openPopup, closePopup };