const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
    headers: {
      authorization: '284a4846-e6ec-4683-88df-170ab9d8f14d',
      'Content-Type': 'application/json',
    },
  };
  
  const handleResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };
  
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    }).then(handleResponse);
  };
  
  export function addCardToServer(cardData) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(cardData),
    }).then(handleResponse);
  }
  
  export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(handleResponse);
  }
  
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(handleResponse);
  };
  
  const avatarForm = document.querySelector('.popup__form[name="update-avatar"]');
  const avatarInput = document.querySelector('#avatar');
  const popup = document.querySelector('.popup_type_edit-avatar');
  const closeButton = popup.querySelector('.popup__close');
  
  function closePopup() {
    popup.classList.remove('popup_is-opened');
  }
  
  closeButton.addEventListener('click', closePopup);
  