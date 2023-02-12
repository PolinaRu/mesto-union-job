import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
    this._container = this._popup.querySelector('.popup__container');
    this._input = this._container.querySelectorAll('.popup__input');
  }

  close() {
    super.close();
    this._container.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._input.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this._getInputValues());
    });
  }
}