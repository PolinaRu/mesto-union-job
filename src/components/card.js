import { elementTemplate, imagePopupImage } from './utils.js';
import { openImage } from './index.js';
import { Api } from './api.js';

// Апишник тут пока заглушкой, надо будет из индекса все передавать
const api = new Api({
    url: "https://nomoreparties.co/v1/plus-cohort-18",
    headers: {
      authorization: "761944ff-ca64-4e82-a14c-fe8b959c12ae",
      "Content-Type": "application/json",
    }
  }); 

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

    //отрисовываем лайк, если он был
  if (element.likes.some((item) => {return item._id === user.id;})) {
    like.classList.add("like_active");
  }

    like.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('like_active')) {
            api.putLike(element._id)
                .then((data) => {
                    evt.target.classList.add('like_active');
                    likeSum.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            api.unputLike(element._id)
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
            api.deleteMyElement(element._id)
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
