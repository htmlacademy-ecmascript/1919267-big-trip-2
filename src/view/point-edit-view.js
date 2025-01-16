import { DateFormat } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { mockOffers } from '../mock/offers.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { formatDate } from '../utils/date.js';
import { getDestinationById, getDestinationIdByName, getOffersByType } from '../utils/point.js';

function createTypeTemplate (type, pointType) {
  return `<div class="event__type-item">
    <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType} ${pointType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalizeFirstLetter(pointType)}</label>
  </div>`;
}

function createDestinationsListTemplate(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

//DESTINATIONS BLOCK
function createDestinationPhotosTemplate(pointDestination) {
  if (!pointDestination?.photos || pointDestination?.photos.length === 0) {
    return '';
  }

  const photos = pointDestination.photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="${pointDestination.name}">`
  ).join('');

  return `<div class="event__photos-container">
      <div class="event__photos-tape">${photos}</div>
    </div>`;
}

function createDestinationsBlockTemplate(destination, destinations) {
  const pointDestination = destinations.find((item) => item.id === destination.id);

  if (!pointDestination || !pointDestination.description) {
    return '';
  }

  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>
      ${createDestinationPhotosTemplate(pointDestination)}
    </section>`;
}

//OFFERS BLOCK
function createOfferTemplate (offer, checkedOffers) {
  const {id, title, price} = offer;
  const isCheckedOffer = checkedOffers.includes(id) ? 'checked' : '';

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${isCheckedOffer}>
    <label class="event__offer-label" for="event-offer-${id}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
}

function createOffersListTemplate (allOffersAvailable, checkedOffersIds) {
  if (allOffersAvailable.length === 0) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${allOffersAvailable.map((offer) => createOfferTemplate(offer, checkedOffersIds)).join('')}
    </div>
  </section>`;
}

function createPointEditTemplate({state, offers, destinations}) {
  const {id, type, dateFrom, dateTo, basePrice, offers: checkedOffersIds} = state;
  const destination = getDestinationById(destinations, state.destination);
  const pointTypes = mockOffers.map((offer) => offer.type);
  const allOffersAvailable = getOffersByType(offers, type);

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => createTypeTemplate(type, pointType)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${capitalizeFirstLetter(type)}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationsListTemplate(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.FULL_DATE)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.FULL_DATE)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createOffersListTemplate(allOffersAvailable, checkedOffersIds)}
                  ${createDestinationsBlockTemplate(destination, destinations)}
                </section>
              </form>
            </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #handleArrowClick = null;
  #handleFormSubmit = null;
  #offerElements = null;

  constructor ({point, offers, destinations, onArrowClick, onFormSubmit}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleArrowClick = onArrowClick;
    this.#handleFormSubmit = onFormSubmit;
    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template () {
    return createPointEditTemplate({
      state: this._state,
      offers: this.#offers,
      destinations: this.#destinations
    });
  }

  _restoreHandlers = () => {
    const offersBlockElement = this.element.querySelector('.event__section--offers');
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    if (offersBlockElement !== null) {
      offersBlockElement.addEventListener('change', this.#offerChangeHandler);
      this.#offerElements = offersBlockElement.querySelectorAll('.event__offer-checkbox');
    }
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({...this._state.point, type: evt.target.value, offers: []});
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationId = getDestinationIdByName(evt.target.value, this.#destinations);
    this.updateElement({destination: destinationId});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = +(evt.target.value);

    if(isNaN(price) || price < 0) {
      evt.target.value = '';
      return;
    }

    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offerChangeHandler = (evt) => {
    const offers = [];
    evt.preventDefault();
    this.#offerElements.forEach((offerElement) => {
      if (offerElement.checked) {
        offers.push(offerElement.id);
      }
    });

    this._setState({offers});
  };
}
