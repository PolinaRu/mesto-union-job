import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup  {
  constructor(popupSelector, {deleteCallback}) {
    super(popupSelector);
    this._deleteCallback = deleteCallback;
    this._button = this._popup.querySelector('.element__button_remove');
    this._functionForDelete = this._functionForDelete.bind(this);
  };

  open(evt) {
    super.open();
    this._elementToDelete = evt.target.closest('.element');
    this._button.addEventListener('click', this._functionForDelete);
  };

  close() {
    super.close();
    this._button.removeEventListener('click', this._functionForDelete);
  }

   _functionForDelete() {
    this._deleteCallback(this._cardToDelete);
  };

};