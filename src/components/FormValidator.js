export default class FormValidator {
  constructor(set, formElement) {
    this._set = set;
    this._formElement = formElement;
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
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._set.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._set.inactiveButtonClass);
    }
  }

  //очистка сообщений ошибки валидации
  _removeValidationErrors = () => {
    const errorSpanList = Array.from(
      this._formElement.querySelectorAll(this._set.inputErrorClass)
    );
    errorSpanList.forEach((inputElement) => {
      inputElement.textContent = "";
    });
  };

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._set.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._set.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this._formElement.addEventListener("reset", () => {
      console.log("сбросили форму, должна почиститься кнопка");
      this._removeValidationErrors();
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
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
