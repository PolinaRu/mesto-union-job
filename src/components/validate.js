const showInputError = (formElement, inputElement, errorMessage, set) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(set.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(set.errorClass);
};

const hideInputError = (formElement, inputElement, set) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(set.inputErrorClass);
    errorElement.classList.remove(set.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, set) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, set);
    } else {
        hideInputError(formElement, inputElement, set);
    }
};

const setEventListeners = (formElement, set) => {
    const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
    const buttonElement = formElement.querySelector(set.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, set);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, set);
            toggleButtonState(inputList, buttonElement, set);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
const blockSubmitButton = (set, cardSubmitButton) => {
    cardSubmitButton.disabled = true;
    cardSubmitButton.classList.add(set.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, set) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(set.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(set.inactiveButtonClass);
    }
}
const enableValidation = (set) => {

    const formList = Array.from(document.querySelectorAll(set.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, set);
    });
};


export {showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, blockSubmitButton, toggleButtonState, enableValidation};