export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
    window.addEventListener("mousedown", this._handleOverlay);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose); 
    window.removeEventListener("mousedown", this._handleOverlay);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleOverlay(evt) {
    if (evt.target.classList.contains('popup__window-image') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    const button = this._popup.querySelector('.popup__button_making_exit');
    button.addEventListener('click', () => this.close());
  }
}