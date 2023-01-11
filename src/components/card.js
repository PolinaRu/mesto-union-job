import { elements } from "./utils.js";
import { createElement } from "./index.js"

function addLike(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('like_active');
};
function getNewElement(element) {
    if (element) {
        const newElement = createElement(element);
        elements.prepend(newElement);
    }
};
function removeElement(evt) {
    evt.target.closest('.element').remove();
};

export { addLike, getNewElement, removeElement }; 
