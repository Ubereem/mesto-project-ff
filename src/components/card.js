import { addLike, removeLike, deleteCard } from './api';
import { openModal, closeModal } from './modal';
import { addPopupListeners } from './modal.js';

export function createCard(cardData, handleDelete, handleImageClick, handleCardLike, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardTitle = cardTemplate.querySelector('.card__title');
  const likeButton = cardTemplate.querySelector('.card__like-button');
  const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');
  const likeCountElement = cardTemplate.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes?.length || 0;
  likeButton.setAttribute('data-id', cardData._id);
  likeCountElement.setAttribute('data-id', cardData._id);

  if (cardData.likes && cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => handleImageClick(cardData));

  cardDeleteButton.addEventListener('click', () => {
    const cardElement = cardDeleteButton.closest('.card');
    handleDelete(cardElement, cardData._id);
  });

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    handleCardLike(cardData._id, isLiked, likeButton, likeCountElement);
  });

  setTimeout(() => {
    updateDeleteButtonVisibility(cardData, currentUserId, cardDeleteButton);
  }, 10);

  return cardTemplate;
}

function updateDeleteButtonVisibility(cardData, currentUserId, cardDeleteButton) {
  if (cardData.owner && cardData.owner._id === currentUserId) {
    cardDeleteButton.style.display = 'block';
  } else {
    cardDeleteButton.style.display = 'none';
  }
}

export function handleCardLike(cardId, isLiked, likeButton, likeCountElement) {
  const likeAction = isLiked ? removeLike(cardId) : addLike(cardId);

  likeAction
    .then(updatedCard => {
      if (likeButton && likeCountElement) {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCountElement.textContent = updatedCard.likes.length;
      }
    })
    .catch(err => console.error('Ошибка при обновлении лайков:', err));
}

export function handleCardDelete(cardElement, cardId) {
  const confirmPopup = document.querySelector('.popup_type_delete');
  const confirmButton = confirmPopup.querySelector('.popup__button_type_confirm');
  const closeButton = confirmPopup.querySelector('.popup__close');

  function handleDeleteClick() {
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(confirmPopup);
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      });
  }

  confirmButton.removeEventListener('click', handleDeleteClick);
  confirmButton.addEventListener('click', handleDeleteClick);
  openModal(confirmPopup);
  addPopupListeners(confirmPopup);
}