import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
    this._container = this._popup.querySelector('.popup__container');
    this._input = this._container.querySelectorAll('.popup__input');
    this._submitBtn = this._container.querySelector('.popup__button_making_save');
    this._submitBtnText = this._submitBtn.textContent;
  }
  setInputValues(data) {
    this._input.forEach((input) => {
      input.value = data[input.name];    
    });
  }
  close() {
    super.close();
    this._container.reset();
  }

  getInputValues() {
    this._inputValues = {};
    this._input.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  handleSubmitRender (request, {data}, evt) {
    evt.preventDefault();
    this.renderLoading(true);
    request({data})
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
    this.renderLoading(false);
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this.getInputValues());
    });
  }
}