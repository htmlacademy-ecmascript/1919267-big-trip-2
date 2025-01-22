import Observable from '../framework/observable.js';
import { DEFAULT_FILTER_TYPE } from '../const.js';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers.js';
import { getMockPoints } from '../mock/points.js';

export default class PointsModel extends Observable {
  #points = getMockPoints();
  #offers = mockOffers;
  #destinations = mockDestinations;
  #currentFilter = DEFAULT_FILTER_TYPE;

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  get currentFilter () {
    return this.#currentFilter;
  }

  set currentFilter (updatedFilter) {
    this.#currentFilter = updatedFilter;
  }
}
