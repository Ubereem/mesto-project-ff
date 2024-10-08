// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// Функция для создания карточки
const placesList = document.querySelector('.places__list');

function createCard(cardData, handleDelete) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const cardElement = deleteButton.closest('.card');
        handleDelete(cardElement); 
    });

    return cardTemplate;
}

function handleCardDelete(cardElement) {
    cardElement.remove();
}

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, handleCardDelete);
    placesList.append(cardElement);
});


const addCard = document.querySelector('.profile__add-button')
addCard.addEventListener('click', () => {
    const newCardData = { 
      name: 'Название новой карточки',
      link: ''
    };

    const newCardElement = createCard(newCardData, handleCardDelete);
  
    placesList.prepend(newCardElement);
  });