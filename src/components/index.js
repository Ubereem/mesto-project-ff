import { createCard, handleCardDelete, handleCardLike } from './card.js';
import { openModal, closeModal, addPopupListeners } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getUserInfo, updateUserInfo, addCardToServer, updateAvatar } from './api';

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardAddForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardAddForm.querySelector('.popup__input_type_url');
const cardAddPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form[name="edit-profile"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');
const profileAvatar = document.querySelector('.profile__image');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form');
const avatarInput = avatarEditForm.querySelector('.popup__input[name="avatar"]');

profileAvatar.addEventListener('click', () => openModal(avatarEditPopup));

avatarEditPopup.addEventListener('submit', (event) => {
  event.preventDefault();
  const originalText = event.submitter.textContent;
  event.submitter.textContent = 'Сохранение...';
  const newAvatarUrl = avatarInput.value.trim();
  updateAvatar(newAvatarUrl)
    .then((updatedUser) => {
      profileAvatar.style.backgroundImage = `url('${updatedUser.avatar}')`;
      closeModal(avatarEditPopup);
      avatarEditForm.reset();
    })
    .catch(err => console.error(`Ошибка при обновлении аватара: ${err}`))
    .finally(() => {
      event.submitter.textContent = originalText;
    });
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

profileEditButton.addEventListener('click', () => {
  clearValidation(profileForm, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

cardAddButton.addEventListener('click', () => {
  clearValidation(cardAddForm, validationConfig);
  openModal(cardAddPopup);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const originalText = evt.submitter.textContent;
  evt.submitter.textContent = 'Сохранение...';
  updateUserInfo(profileNameInput.value.trim(), profileJobInput.value.trim())
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.error(`Ошибка обновления профиля: ${err}`))
    .finally(() => {
      evt.submitter.textContent = originalText;
    });
});

function handleImageClick(cardData) {
  imagePopupElement.src = cardData.link;
  imagePopupElement.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const originalText = evt.submitter.textContent;
  evt.submitter.textContent = 'Сохранение...';
  const cardName = cardNameInput.value.trim();
  const cardLink = cardUrlInput.value.trim();
  if (!cardName || !cardLink) return;

  addCardToServer({ name: cardName, link: cardLink })
    .then(newCard => {
      const cardData = {
        _id: newCard._id,
        name: newCard.name,
        link: newCard.link,
        likes: newCard.likes,
        owner: newCard.owner
      };

      const newCardElement = createCard(
        cardData,
        handleCardDelete,
        handleImageClick,
        handleCardLike,
        newCard.owner._id
      );
      placesList.prepend(newCardElement);
      closeModal(cardAddPopup);
      cardAddForm.reset();
    })
    .catch(err => console.error('Ошибка при добавлении карточки на сервер:', err))
    .finally(() => {
      evt.submitter.textContent = originalText;
    });
}


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    cards.forEach(card => {
      const cardElement = createCard(
        card, 
        handleCardDelete, 
        handleImageClick, 
        handleCardLike, 
        userData._id
      );
      placesList.append(cardElement);
    });
  })
  .catch(error => console.error('Ошибка при загрузке данных:', error));


cardAddForm.addEventListener('submit', handleCardAddSubmit);
addPopupListeners(imagePopup);
addPopupListeners(profilePopup);
addPopupListeners(cardAddPopup);