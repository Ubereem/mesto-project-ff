// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// Функция для создания карточки
import { initialCards } from './cards.js';
import { createCard, handleCardDelete, handleCardLike } from './card.js';
import { openModal, closeModal, addPopupListeners } from './modal.js';

// Элементы DOM
const placesList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const popupAddCard = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup_type_image');

function handleImageClick(cardData) {
  const popupImageElement = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(document.querySelector('.popup_type_image'));
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardName = formAddCard.querySelector('.popup__input_type_card-name').value.trim();
  const cardLink = formAddCard.querySelector('.popup__input_type_url').value.trim();

  if (!cardName || !cardLink) {
      alert("Введите название и ссылку на картинку.");
      return; 
  }

  const newCardElement = createCard(
      { name: cardName, link: cardLink },
      handleCardDelete, 
      handleImageClick,
      handleCardLike
  );

  placesList.prepend(newCardElement);

  closeModal(popupAddCard);
  formAddCard.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

function openEditProfileModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
}

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, handleCardDelete, handleImageClick, handleCardLike);
  placesList.append(cardElement);
});

addCardButton.addEventListener('click', () => openModal(popupAddCard));
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfileModal);
addPopupListeners(popupImage);

formElement.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
addPopupListeners(popupEditProfile);
addPopupListeners(popupAddCard);
