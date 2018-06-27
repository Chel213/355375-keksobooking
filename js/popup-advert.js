'use strict';

(function () {
  //  функция карточки объявления
  window.createAd = function (listAdvert, templateAd) {
    //  клонируем шаблон
    var popupAdvert = templateAd.cloneNode(true);

    //  заголовок
    popupAdvert.querySelector('.popup__title').textContent = listAdvert.offer.title;

    //  адрес
    popupAdvert.querySelector('.popup__text--address').textContent = listAdvert.offer.address;

    //  цена
    var priceCard = popupAdvert.querySelector('.popup__text--price');
    var textPrice = priceCard.querySelector('span');
    priceCard.textContent = listAdvert.offer.price + '\u20BD';
    priceCard.appendChild(textPrice);

    //  тип жилья
    var typeCard = popupAdvert.querySelector('.popup__type');
    typeCard.textContent = window.data.selectsType(listAdvert.offer.type);

    //  количество комнат
    popupAdvert.querySelector('.popup__text--capacity').textContent = listAdvert.offer.rooms + ' комнаты для ' + listAdvert.offer.guests + ' гостей';

    //  время заезда, выезда
    popupAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + listAdvert.offer.checkin + ', выезд до ' + listAdvert.offer.checkout;

    //  список удобств
    var listFeatures = popupAdvert.querySelector('.popup__features');
    for (var i = 0; i < listAdvert.offer.features.length; i++) {
      var itemDel = listFeatures.querySelector('li:last-child');
      listFeatures.removeChild(itemDel);
    }

    //  описание жилья
    popupAdvert.querySelector('.popup__description').textContent = listAdvert.offer.description;

    //  фото жилья
    var photosCard = popupAdvert.querySelector('.popup__photos');
    var photoCard = photosCard.removeChild(photosCard.querySelector('img'));

    for (var j = 0; j < listAdvert.offer.photos.length; j++) {
      var itemPhotoCard = photoCard.cloneNode(true);
      itemPhotoCard.src = listAdvert.offer.photos[j];
      photosCard.appendChild(itemPhotoCard);
    }

    //  аватар
    popupAdvert.querySelector('.popup__avatar').src = listAdvert.author.avatar;
    return popupAdvert;
  };
})();
