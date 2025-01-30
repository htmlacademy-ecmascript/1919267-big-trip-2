import { AvailableSortType, SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate ({type, isDisabled}, currentSortType) {
  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input
              id="sort-${type}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${type}"
              data-sort-type="${type}"
              ${(isDisabled) ? 'disabled' : ''}
              ${(type === currentSortType) ? 'checked' : ''}
            >
            <label class="trip-sort__btn" for="sort-${type}">${type}</label>
          </div>`;
}

function createTripSortTemplate (currentSortType) {
  const sortTypes = Object.values(SortType)
    .map((type) => ({
      type,
      isDisabled: !AvailableSortType[type],
    }));
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypes.map((item) => createSortItemTemplate(item, currentSortType)).join('')}
    </form>`
  );
}

export default class TripSortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor ({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
