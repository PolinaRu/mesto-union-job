export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
    window.addEventListener("mousedown", this._handleOverlay.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this)); 
    window.removeEventListener("mousedown", this._handleOverlay.bind(this));//почему-то нормально не снимается?
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