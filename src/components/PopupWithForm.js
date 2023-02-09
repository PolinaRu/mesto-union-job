import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._container = this._popup.querySelector('.popup__container');
    this._input = this._container.querySelectorAll('.popup__input');
  };

  close() {
    super.close();
    this._container.reset();
  };

  _getInputValues() {
    this._inputValues = {};
    this._input.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());
    });
  };

};