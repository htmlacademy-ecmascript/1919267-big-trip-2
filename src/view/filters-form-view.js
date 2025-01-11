import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';

function createFilterItemTemplate (filter, currentFilter) {
  const {type, count} = filter;
  const isChecked = type === currentFilter ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';

  return `<div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value=${type}
          data-filter-type="${type}"
          ${isDisabled}
          ${isChecked}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`;
}

function createFiltersFormTemplate(filterItems, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
    ${filterItems.map((item) => createFilterItemTemplate(item, currentFilter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FiltersFormView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilter, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersFormTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
