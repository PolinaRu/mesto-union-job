export default class FormValidator {
  constructor(set, formElement) {
    this._set = set;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._set.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._set.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._set.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._set.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._set.inputErrorClass);
    errorElement.classList.remove(this._set.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._set.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._set.inactiveButtonClass);
    }
  }

  //очистка сообщений ошибки валидации
  _removeValidationErrors = () => { //console.log(this._inputList, this._errorSpanList);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("reset", () => {
      this._removeValidationErrors();
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
