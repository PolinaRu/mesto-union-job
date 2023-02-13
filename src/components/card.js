export default class Card {
  constructor (card, userId, handleCardClick, handleLike, handleDislike, handleDelElement, selector) {
    this._cardElement = document.querySelector(selector).content.cloneNode(true);
    this._elementLike = this._cardElement.querySelector(".like");
    this._elementImg = this._cardElement.querySelector(".element__image");
    this._elementDrop = this._cardElement.querySelector(".element__button_remove");
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

  _createCard() {
    this._cardElement.querySelector(".element__title").textContent = this._card.name;
    this._cardElement.querySelector(".element__like-sum").textContent =
      this._card.likes.length;
    this._elementImg.src = this._card.link;
    this._elementImg.alt =this._card.name;

    //отрисовываем лайк, если он был
    if (
      this._card.likes.some((item) => {
        return item._id === this._userId;
      })
    ) {
      this._elementLike.classList.add("like_active");
    }
  
    //проверяем рисовать ли корзину
    if (this._userId == this._card.owner._id) {
      this._elementDrop.classList.add('element__button_remove_active');
    }  
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", (evt)=> this._toggleLike(evt)); 
    this._elementImg.addEventListener("click", () => {
      this._handleCardClick(this._card.link, this._card.name);
    });
    if (this._userId == this._card.owner._id) {
      this._elementDrop.addEventListener("click", (evt) => {
        this._handleDelElement(this._card._id)
          .then(() => evt.target.closest(".element").remove())
          .catch((err) => {
            console.error(err);
          });
      });
    }
  }

  generate() {  
    this._createCard();
    this._setEventListeners();
    return this._cardElement;
  }
}