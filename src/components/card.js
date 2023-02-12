export default class Card {
  constructor (card, userId, handleCardClick, handleLike, handleDislike, handleDelElement, selector) {
    this._cardElement = document.querySelector(selector).content;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDelElement = handleDelElement;

    this._userId = userId;
    this._card = card;
  }

  _toggleLike(evt) {
    if (evt.target.classList.contains("like_active")) {
      // отправляем дизлайк, отрисовываем новое количество, убираем заливку
      this._handleDislike(this._card._id)
        .then((res) => {
          evt.target.nextElementSibling.textContent = res.likes.length;
          evt.target.classList.remove("like_active");
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      this._handleLike(this._card._id)
        .then((res) => {
          evt.target.nextElementSibling.textContent = res.likes.length;
          evt.target.classList.add("like_active");
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  }

  generate() {
    const cardElement = this._cardElement.cloneNode(true);
    const elementImg = cardElement.querySelector(".element__image");
    const elementLike = cardElement.querySelector(".like");
    const elementDrop = cardElement.querySelector(".element__button_remove");
  
    cardElement.querySelector(".element__title").textContent = this._card.name;
    cardElement.querySelector(".element__like-sum").textContent =
      this._card.likes.length;
    elementImg.src = this._card.link;
    elementImg.alt =this._card.name;
  
    elementLike.addEventListener("click", (evt)=> this._toggleLike(evt)); 

    //отрисовываем лайк, если он был
    if (
      this._card.likes.some((item) => {
        return item._id === this._userId;
      })
    ) {
      elementLike.classList.add("like_active");
    }
  
    //проверяем рисовать ли корзину
    if (this._userId == this._card.owner._id) {
      elementDrop.classList.add('element__button_remove_active');
      elementDrop.addEventListener("click", (evt) => {
        this._handleDelElement(this._card._id)
          .then(() => evt.target.closest(".element").remove())
          .catch((err) => {
            console.error(err);
          });
      });
    } /*else {
      elementDrop.style.display = "none";
    }*/
  
    elementImg.addEventListener("click", () => {
      this._handleCardClick(this._card.link, this._card.name);
    });
  
    return cardElement;
  }
}