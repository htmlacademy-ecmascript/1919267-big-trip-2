import { DEFAULT_FILTER_TYPE } from '../const.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {
  #currentFilter = DEFAULT_FILTER_TYPE;

  get currentFilter () {
    return this.#currentFilter;
  }

  setCurrentFilter (updateType, updatedFilter) {
    this.#currentFilter = updatedFilter;
    this._notify(updateType, updatedFilter);
  }
}
