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
const profileNameInput  = profileForm.querySelector('.popup__input_type_name');
const profileJobInput  = profileForm.querySelector('.popup__input_type_description');



function handleImageClick(cardData) {
  imagePopupElement.src = cardData.link;
  imagePopupElement.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function handleCardAddSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value.trim();
  const cardLink = cardUrlInput.value.trim();

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

  closeModal(cardAddPopup);
  cardAddForm.reset();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(profilePopup);
}

function openEditProfileModal() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, handleCardDelete, handleImageClick, handleCardLike);
  placesList.append(cardElement);
});

cardAddButton.addEventListener('click', () => openModal(cardAddPopup));
profileEditButton.addEventListener('click', openEditProfileModal);

addPopupListeners(imagePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardAddForm.addEventListener('submit', handleCardAddSubmit);
addPopupListeners(profilePopup);
addPopupListeners(cardAddPopup);
