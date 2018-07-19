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
    var selectsType = function (type) {
      var displayTitle;
      switch (type) {
        case 'flat':
          displayTitle = 'Квартира';
          break;
        case 'bungalo':
          displayTitle = 'Бунгало';
          break;
        case 'house':
          displayTitle = 'Дом';
          break;
        case 'palace':
          displayTitle = 'Дворец';
          break;
      }
      return displayTitle;
    };
    var typeCard = popupAdvert.querySelector('.popup__type');
    typeCard.textContent = selectsType(listAdvert.offer.type);

    //  количество комнат
    popupAdvert.querySelector('.popup__text--capacity').textContent = listAdvert.offer.rooms + ' комнаты для ' + listAdvert.offer.guests + ' гостей';

    //  время заезда, выезда
    popupAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + listAdvert.offer.checkin + ', выезд до ' + listAdvert.offer.checkout;

    //  список удобств
    var listFeatures = popupAdvert.querySelector('.popup__features');

    var wifiFeatures = listFeatures.querySelector('.popup__feature--wifi');
    var dishwasherFeatures = listFeatures.querySelector('.popup__feature--dishwasher');
    var parkingFeatures = listFeatures.querySelector('.popup__feature--parking');
    var washerFeatures = listFeatures.querySelector('.popup__feature--washer');
    var elevatorFeatures = listFeatures.querySelector('.popup__feature--elevator');
    var conditionerFeatures = listFeatures.querySelector('.popup__feature--conditioner');

    var displayFeatures = function (featuresName, featuresIcon) {
      if (listAdvert.offer.features.indexOf(featuresName) === -1) {
        featuresIcon.classList.add('visually-hidden');
      }
    };

    if (listAdvert.offer.features.length) {
      listFeatures.classList.remove('visually-hidden');
      displayFeatures('wifi', wifiFeatures);
      displayFeatures('dishwasher', dishwasherFeatures);
      displayFeatures('parking', parkingFeatures);
      displayFeatures('washer', washerFeatures);
      displayFeatures('elevator', elevatorFeatures);
      displayFeatures('conditioner', conditionerFeatures);
    }


    //  описание жилья
    popupAdvert.querySelector('.popup__description').textContent = listAdvert.offer.description;

    //  фото жилья
    var photosCard = popupAdvert.querySelector('.popup__photos');
    var photoCard = photosCard.removeChild(photosCard.querySelector('img'));

    if (listAdvert.offer.photos.length) {
      photosCard.classList.remove('visually-hidden');
      listAdvert.offer.photos.forEach(function (item) {
        var itemPhotoCard = photoCard.cloneNode(true);
        itemPhotoCard.src = item;
        photosCard.appendChild(itemPhotoCard);
      });
    }


    //  аватар
    popupAdvert.querySelector('.popup__avatar').src = listAdvert.author.avatar;
    return popupAdvert;
  };
})();
