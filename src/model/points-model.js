import { POINTS_COUNT } from '../const.js';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers.js';
import { getRandomMockPoint } from '../mock/points.js';

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomMockPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints () {
    return this.points;
  }

  getOffers () {
    return this.offers;
  }

  getOffersByType (type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOfferById (type, offerIdsArray) {
    return this.getOffersByType(type).filter((offer) => offerIdsArray.find((id) => offer.id === id));
  }

  getDestinations () {
    return this.destinations;
  }

  getDestinationById (id) {
    return this.getDestinations().find((destination) => destination.id === id);
  }
}
