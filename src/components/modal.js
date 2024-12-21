const openedPopupSelector = '.popup_is-opened';
const closeButtonSelector = '.popup__close';

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(openedPopupSelector);
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
  const closeButton = popupElement.querySelector(closeButtonSelector);

  closeButton.addEventListener('click', () => closeModal(popupElement));

  popupElement.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(popupElement);
    }
  });
};

const popup = document.querySelector('.popup_type_edit-avatar');
addPopupListeners(popup);
