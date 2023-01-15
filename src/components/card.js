import { elementTemplate, imagePopupImage } from './utils.js';
import { openImage, addLike, removeLike } from './index.js';
import { deleteMyElement, putLike, unputLike } from './api.js';

function countLike(element, likes, user) {
    const like = element.querySelector('.like');
    const likeSum = element.querySelector('.element__like-sum');
    if (likes.length !== 0) {
        likes.forEach((owner) => {
            if (owner._id === user.id) {
                like.classList.add('like_active');
            } else {
                like.classList.remove('like_active');
            }
        });
    } else {
        like.classList.remove('like_active');
    }
    likeSum.textContent = likes.length;
}

function createElement(element, user) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    const elementTitle = newElement.querySelector('.element__title');
    const like = newElement.querySelector('.like');
    const deleteElement = newElement.querySelector('.element__button_remove');
    elementTitle.textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;
    elementImage.addEventListener('click', () => {
        imagePopupImage.src = elementImage.src;
        imagePopupImage.alt = elementTitle.textContent;
        openImage(elementImage, elementTitle);
    });


    like.addEventListener('click', () => {
        if (!like.classList.contains('.like_active')) {
            addLike(newElement, element, user);
        } else {
            removeLike(newElement, element, user);
        }
    });
    countLike(newElement, element.likes, user);

    like.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('like_active')) {
      putLike(element._id)
        .then((data) => {
          evt.target.classList.add('like-active');
          document.querySelector('.element__like-sum').textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      unputLike(element._id)
        .then((data) => {
          evt.target.classList.remove('like-active');
          document.querySelector('.element__like-sum').textContent = data.likes.length-1;
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
                        console.error(err);
                    });
              })
}
    deleteElement.dataset.id = element._id;
    return newElement;
};

function removeCard(card) {
    const element = card.closest('.element');
    element.remove();
  }

export { countLike, createElement }; 
