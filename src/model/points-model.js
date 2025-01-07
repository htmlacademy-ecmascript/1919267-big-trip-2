import { FilterType } from '../const.js';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers.js';
import { getMockPoints } from '../mock/points.js';

export default class PointsModel {
  #points = getMockPoints();
  #offers = mockOffers;
  #destinations = mockDestinations;
  #currentFilter = FilterType.EVERYTHING;

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  getOffersByType (type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getOffersById (type, offerIdsArray) {
    return this.getOffersByType(type).filter((offer) => offerIdsArray.find((id) => offer.id === id));
  }

  getDestinationById (id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  get currentFilter () {
    return this.#currentFilter;
  }
}
