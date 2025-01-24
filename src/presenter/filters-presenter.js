import { UpdateType } from '../const.js';
import { remove, render, replace } from '../framework/render';
import { generateFilters } from '../utils/filter.js';
import FiltersFormView from '../view/filters-form-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #filtersModel = null;
  #currentFilter = null;

  #filterComponent = null;

  constructor({filtersContainer, pointsModel, filtersModel}) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;
    const filters = generateFilters(points);
    return filters;
  }

  init() {
    this.#currentFilter = this.#filtersModel.currentFilter;
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

  #handleModelEvent = () => {
    this.init();
  };

  #filterChangeHandler = (filterType) => {
    if (this.#filtersModel.currentFilter === filterType) {
      return;
    }

    this.#filtersModel.setCurrentFilter(UpdateType.MAJOR, filterType);
  };
}
