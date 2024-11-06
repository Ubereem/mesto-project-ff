const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  modal.classList.remove('popup_is-animated');
  document.addEventListener('keyup', handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.removeEventListener('keyup', handleEscKeyUp);
};

export const addPopupListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close');
  closeButton.addEventListener("click", () => closeModal(popupElement));

  popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains('popup')) {
          closeModal(popupElement);
      }
  });
};

