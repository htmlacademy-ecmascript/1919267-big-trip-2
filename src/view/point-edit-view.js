import he from 'he';
import { BLANK_POINT, DateFormat } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { mockOffers } from '../mock/offers.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { formatDate } from '../utils/date.js';
import { getDestinationById, getDestinationIdByName, getOffersByType } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypeTemplate (type, pointType) {
  return `<div class="event__type-item">
    <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType} ${pointType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalizeFirstLetter(pointType)}</label>
  </div>`;
}

function createDestinationsListTemplate(destinations) {
  return destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('');
}

//DESTINATIONS BLOCK
function createDestinationPhotosTemplate(pointDestination) {
  if (!pointDestination?.photos || pointDestination?.photos.length === 0) {
    return '';
  }

  const photos = pointDestination.photos.map((photo) =>
    `<img class="event__photo" src="${he.encode(photo)}" alt="${he.encode(pointDestination.name)}">`
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
      <p class="event__destination-description">${he.encode(pointDestination.description)}</p>
      ${createDestinationPhotosTemplate(pointDestination)}
    </section>`;
}

//OFFERS BLOCK
function createOfferTemplate (offer, checkedOffers) {
  const {id, title, price} = offer;
  const isCheckedOffer = checkedOffers.includes(id) ? 'checked' : '';

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" data-offer-id=${he.encode(id)} id="event-offer-${he.encode(id)}-1" type="checkbox" name="event-offer-${he.encode(id)}" ${isCheckedOffer}>
    <label class="event__offer-label" for="event-offer-${he.encode(id)}-1">
      <span class="event__offer-title">${he.encode(title)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${he.encode(String(price))}</span>
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

function createPointEditTemplate({state, offers, destinations, isNewPoint}) {
  const {id, type, dateFrom, dateTo, basePrice, offers: checkedOffersIds, isSubmitDisabled} = state;
  const destination = getDestinationById(destinations, state.destination);
  const pointTypes = mockOffers.map((offer) => offer.type);
  const allOffersAvailable = getOffersByType(offers, type);

  const rollupButtonTemplate = !isNewPoint
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${he.encode(type)}.png" alt="Event type icon">
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
                    <input
                      class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${he.encode(destination.name ?? '')}"
                      list="destination-list-1"
                      data-field-validated=""
                    >
                    <datalist id="destination-list-1">
                      ${createDestinationsListTemplate(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="event-start-time"
                      value="${formatDate(dateFrom, DateFormat.FULL_DATE)}"
                      data-field-validated=""
                    >
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="event-end-time"
                      value="${formatDate(dateTo, DateFormat.FULL_DATE)}"
                      data-field-validated=""
                    >
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${he.encode(String(basePrice))}>
                  </div>

                  <button
                    class="event__save-btn  btn  btn--blue"
                    type="submit"
                    ${isSubmitDisabled ? 'disabled' : ''}
                  >
                    Save
                  </button>
                  <button class="event__reset-btn" type="reset">
                  ${isNewPoint ? 'Cancel' : 'Delete'}
                  </button>
                  ${rollupButtonTemplate}
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
  #handleDeleteClick = null;
  #offerElements = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #isNewPoint = false;

  constructor ({point = BLANK_POINT, offers, destinations, isNewPoint, onArrowClick, onFormSubmit, onDeleteClick}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleArrowClick = onArrowClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewPoint = isNewPoint;
    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template () {
    return createPointEditTemplate({
      state: this._state,
      offers: this.#offers,
      destinations: this.#destinations,
      isNewPoint: this.#isNewPoint,
    });
  }

  _restoreHandlers = () => {
    const offersBlockElement = this.element.querySelector('.event__section--offers');
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);

    if (!this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#pointDeleteClickHandler);

    if (offersBlockElement !== null) {
      offersBlockElement.addEventListener('change', this.#offerChangeHandler);
      this.#offerElements = offersBlockElement.querySelectorAll('.event__offer-checkbox');
    }

    this.#initDatePicker();
  };

  #initDatePicker = () => {
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: { firstDayOfWeek: 1 },
      'time_24hr': true,
    };

    this.#dateFromPicker = flatpickr(this.element.querySelector('input[name="event-start-time"]'), {
      ...commonConfig,
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onClose: this.#dateFromCloseHandler,
    });

    this.#dateToPicker = flatpickr(this.element.querySelector('input[name="event-end-time"]'), {
      ...commonConfig,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onClose: this.#dateToCloseHandler,
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this.#dateToPicker.set('minDate', this._state.dateFrom);
    this.updateElement({
      dateFrom: userDate,
      isSubmitDisabled: this.#validateFields(),
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
    this.updateElement({
      dateTo: userDate,
      isSubmitDisabled: this.#validateFields(),
    });
  };

  static parsePointToState = (point) => {
    const isSubmitDisabled = !point.destination || point.dateFrom === null || point.dateTo === null;

    return {
      ...point,
      isSubmitDisabled
    };
  };

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isSubmitDisabled;

    return point;
  };

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }

  removeElement = () => {
    super.removeElement();
    if (this.#dateFromPicker !== null) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker !== null) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({...this._state.point, type: evt.target.value, offers: []});
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationId = getDestinationIdByName(evt.target.value, this.#destinations);
    if (!destinationId) {
      this.updateElement({
        destination: '',
        isSubmitDisabled: this.#validateFields()
      });
    }
    this.updateElement({
      destination: destinationId,
      isSubmitDisabled: this.#validateFields()
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = parseInt(evt.target.value, 10);

    if(isNaN(price) || price < 0) {
      evt.target.value = '';
      return;
    }

    this._setState({
      basePrice: price,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.#offerElements).
      filter((item) => item.checked).
      map((item) => item.dataset.offerId);
    this._setState({offers: checkedOffers});
  };

  #validateFields() {
    const elements = [
      ...this.element.querySelectorAll('input[data-field-validated=""]'),
    ];

    return elements.some((element) => {
      const isEmpty = element.value.length === 0;

      if (element.classList.contains('event__input--destination')) {
        return (isEmpty || getDestinationIdByName(element.value, this.#destinations,).length === 0);
      }
      return isEmpty;
    });
  }

  #pointDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };
}
