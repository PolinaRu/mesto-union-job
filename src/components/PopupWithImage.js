import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor (popupSelector, imageSelector, textSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);    
    this._text = this._popup.querySelector(textSelector);
  }

  open (srcDom, textDom) {
    this._image.src = srcDom.src;
    this._image.alt = textDom.textContent;
    this._text.textContent = textDom.textContent;
    super.open();
  }
}