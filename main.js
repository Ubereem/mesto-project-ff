(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.cloneNode(!0),p=o.querySelector(".card__image"),c=o.querySelector(".card__title"),u=o.querySelector(".card__like-button"),i=o.querySelector(".card__delete-button");return p.src=e.link,p.alt=e.name,c.textContent=e.name,p.addEventListener("click",(function(){return n(e)})),i.addEventListener("click",(function(){var e=i.closest(".card");t(e)})),u.addEventListener("click",(function(){r(u)})),o}function t(e){e.remove()}function n(e){e.classList.toggle("card__like-button_is-active")}var r=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&p(t)}},o=function(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keyup",r)},p=function(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keyup",r)},c=function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return p(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&p(e)}))},u=document.querySelector(".popup_type_image"),i=u.querySelector(".popup__image"),a=u.querySelector(".popup__caption"),d=document.querySelector(".places__list"),s=document.querySelector(".profile__add-button"),l=document.querySelector('.popup__form[name="new-place"]'),_=l.querySelector(".popup__input_type_card-name"),m=l.querySelector(".popup__input_type_url"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_edit"),f=v.querySelector('.popup__form[name="edit-profile"]'),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=document.querySelector(".profile__edit-button"),L=f.querySelector(".popup__input_type_name"),g=f.querySelector(".popup__input_type_description");function E(e){i.src=e.link,i.alt=e.name,a.textContent=e.name,o(u)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,t,E,n);d.append(o)})),s.addEventListener("click",(function(){return o(y)})),S.addEventListener("click",(function(){L.value=k.textContent,g.value=q.textContent,o(v)})),c(u),f.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=L.value,q.textContent=g.value,p(v)})),l.addEventListener("submit",(function(r){r.preventDefault();var o=_.value.trim(),c=m.value.trim();if(o&&c){var u=e({name:o,link:c},t,E,n);d.prepend(u),p(y),l.reset()}else alert("Введите название и ссылку на картинку.")})),c(v),c(y)})();