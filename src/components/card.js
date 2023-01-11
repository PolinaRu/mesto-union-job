import { elementTemplate } from "./utils.js";
import { openImage } from "./index.js"

function addLike(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('like_active');
};
function createElement(element) {
   const newElement = elementTemplate.querySelector('.element').cloneNode(true);
   const elementImage = newElement.querySelector('.element__image');
   newElement.querySelector('.element__title').textContent = element.name;
   elementImage.src = element.link;
   elementImage.alt = element.name;
   newElement.querySelector('.like').addEventListener('click', addLike);
   newElement.querySelector('.element__button_remove').addEventListener('click', removeElement);
   elementImage.addEventListener('click', () => {openImage(element.link, element.name)});
   return newElement;
 };

function removeElement(evt) {
    evt.target.closest('.element').remove();
};

export { addLike, removeElement, createElement }; 
