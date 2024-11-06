import { openModal } from "./modal";

export function createCard(cardData, handleDelete, handleImageClick, handleCardLike) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const likeButton = cardTemplate.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => handleImageClick(cardData));

    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const cardElement = deleteButton.closest('.card');
        handleDelete(cardElement);
    });
    likeButton.addEventListener('click', () => {
        handleCardLike(likeButton);
    });

    return cardTemplate;
}

export function handleCardDelete(cardElement) {
    cardElement.remove();
}

export function handleCardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}
