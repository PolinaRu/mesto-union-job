
// // Апишник тут пока заглушкой, надо будет из индекса все передавать
// const api = new Api({
//     url: "https://nomoreparties.co/v1/plus-cohort-18",
//     headers: {
//       authorization: "761944ff-ca64-4e82-a14c-fe8b959c12ae",
//       "Content-Type": "application/json",
//     }
//   }); 

// // PopupImage тоже заглушка, будем передавать колбэк из индекса
// const popupImg = new PopupWithImage(popupImage, imagePopupImage, subtitlePopupImage);
// popupImg.setEventListeners();



export default class Card {
    constructor(data, userId, selector, { handleLike, handleImagePopup, deleteMyElement }) {
        this._id = data._id;
        this._image = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._ownerId = data.owner._id;

        this._userId = userId;

        this._handleLike = handleLike;
        this._handleImagePopup = handleImagePopup;
        this._deleteMyElement = deleteMyElement;

        this._newElement = selector.querySelector('.element').cloneNode(true);
        this._elementTitle = this._newElement.querySelector('.element__title');
        this._elementImage = this._newElement.querySelector('.element__image');
        this._like = this._newElement.querySelector('.like');
        this._likeSum = this._newElement.querySelector('.element__like-sum');
        this._deleteElement = this._newElement.querySelector('.element__button_remove');
    }


    createElement() {
        this._newElement.dataset.id = this._id;
        this._elementTitle.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;


        if (this._likes.length !== 0) {
            this._likeSum.textContent = this._likes.length;

            if (this._userId === this._ownerId) {
                this._deleteElement.classList.add('element__button_remove_active');
            }

        } else {
            this._likeSum.textContent = 0;
            this._deleteElement.classList.remove('element__button_remove_active');
        }

        this._putLike();
        this._setEventListeners();

        return this._newElement;
    };
    _checkId() {
        return this._likes.some((item) => {
            return item._id === this._userId;
        });
    };
    _putLike() {
        if (this._checkId()) {
            this._like.classList.add('like_active');
        } else {
            this._like.classList.remove('like_active');
        }
    };
    _isLiked() {
        return this._like.classList.contains('like_active');
    };

    toggleLikes(data) {
        if (data.likes.length === 0) {
            this._likeSum.textContent = 0;
            this._like.classList.remove('like_active');
        } else {
            this._like.textContent = data.likes.length;
            this._like.classList.add('like_active');
        }
        this._like.classList.toggle('like_active');
    };

    _setEventListeners() {
        this._elementImage.addEventListener('click', () => {
            this._handleImagePopup(this._name, this._link);
        });
        this._like.addEventListener('click', () => {
            this._handleLike(this._id, this._isLiked())
            this._likeSum.style.visibility = 'visible';
        })
        this._deleteElement.addEventListener('click', (evt) => { this._deleteMyElement(evt) });
    };
}







//     elementImage.addEventListener('click', () => {
//         popupImg.open(elementImage, elementTitle); //эта функция и будет проброшена коллбэком
//     });

//     //отрисовываем лайк, если он был
//   if (element.likes.some((item) => {return item._id === user.id;})) {
//     like.classList.add("like_active");
//   }

//     like.addEventListener('click', function (evt) {
//         if (!evt.target.classList.contains('like_active')) {
//             api.putLike(element._id)
//                 .then((data) => {
//                     evt.target.classList.add('like_active');
//                     likeSum.textContent = data.likes.length;
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 })
//         } else {
//             api.unputLike(element._id)
//                 .then((data) => {
//                     evt.target.classList.remove('like_active');
//                     likeSum.textContent = data.likes.length;
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 })
//         }
//     });
//     if (user.id === element.owner._id) {
//         deleteElement.classList.add('element__button_remove_active');
//         deleteElement.addEventListener('click', () => {
//             api.deleteMyElement(element._id)
//                 .then(() => {
//                     removeCard(deleteElement);
//                 })
//                 .catch((err) => {
//                     console.error(err)
//                 })
//         });
//     }




