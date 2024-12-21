function updateInputErrorState(formElement, inputElement, settings, showError, errorMessage = '') {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (showError) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    } else {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(settings.errorClass);
    }
}

function checkInputValidity(formElement, inputElement, settings) {
    if (inputElement.validity.patternMismatch) {
        const customError = inputElement.dataset.customError;
        updateInputErrorState(formElement, inputElement, settings, true, customError);
    } else if (!inputElement.validity.valid) {
        updateInputErrorState(formElement, inputElement, settings, true, inputElement.validationMessage);
    } else {
        updateInputErrorState(formElement, inputElement, settings, false);
    }
}

function toggleButtonState(inputList, buttonElement, settings) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    buttonElement.classList.toggle(settings.inactiveButtonClass, hasInvalidInput);
    buttonElement.disabled = hasInvalidInput;
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        updateInputErrorState(formElement, inputElement, settings, false);
    });

    toggleButtonState(inputList, submitButton, settings);
}

export { enableValidation, clearValidation };
