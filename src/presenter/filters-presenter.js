import { remove, render, replace } from '../framework/render';
import { generateFilters } from '../utils/filter.js';
import FiltersFormView from '../view/filters-form-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #currentFilter = null;

  #filterComponent = null;

  constructor({filtersContainer, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
  }

  get filters() {
    return generateFilters(this.#pointsModel.points);
  }

  init() {
    this.#currentFilter = this.#pointsModel.currentFilter;
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersFormView({
      filters,
      currentFilter: this.#currentFilter,
      onFilterTypeChange: this.#filterChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterChangeHandler = (filterType) => {
    if (this.#pointsModel.filter === filterType) {
      return;
    }

    this.#pointsModel.currentFilter = filterType;
  };
}
