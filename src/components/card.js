import { elementTemplate, imagePopupImage } from './utils.js';
import { openImage } from './index.js';
import { deleteMyElement, putLike, unputLike } from './api.js';

function createElement(element, user) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    const elementTitle = newElement.querySelector('.element__title');
    const like = newElement.querySelector('.like');
    const deleteElement = newElement.querySelector('.element__button_remove');
    const likeSum = newElement.querySelector('.element__like-sum');
    elementTitle.textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;
    likeSum.textContent = element.likes.length;

    elementImage.addEventListener('click', () => {
        imagePopupImage.src = elementImage.src;
        imagePopupImage.alt = elementTitle.textContent;
        openImage(elementImage, elementTitle);
    });

    element.likes.forEach(() => {
        if (element.likes._id === user._id) {
            like.classList.add('like_active');
        }
    });

    like.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('like_active')) {
            putLike(element._id)
                .then((data) => {
                    evt.target.classList.add('like_active');
                    likeSum.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            unputLike(element._id)
                .then((data) => {
                    evt.target.classList.remove('like_active');
                    likeSum.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    });
    if (user.id === element.owner._id) {
        deleteElement.classList.add('element__button_remove_active');
        deleteElement.addEventListener('click', () => {
            deleteMyElement(element._id)
                .then(() => {
                    removeCard(deleteElement);
                })
                .catch((err) => {
                    console.error(err)
                })
        });
    }
    return newElement;
}

function removeCard(card) {
    const element = card.closest('.element');
    element.remove();
}

export { createElement }; 
