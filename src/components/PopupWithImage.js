import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor (popupSelector, imageSelector, textSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);    
    this._text = this._popup.querySelector(textSelector);
  }

  open (src, text) {
    this._image.src = src;
    this._image.alt = text;
    this._text.textContent = text;
    super.open();
  }
}