import {closePopupByEsc} from './index.js';
import { newElementTitle, newElementLink } from './utils.js';


function openPopup(evt) {
    evt.classList.add('popup_opened');
    window.addEventListener('keydown', closePopupByEsc);
    
};
function closePopup(evt) {
    evt.classList.remove('popup_opened');
    window.removeEventListener('keydown', closePopupByEsc); 
    newElementTitle.value = "";
    newElementLink.value = "";

};

export { openPopup, closePopup };