import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers.js';
import { getMockPoints } from '../mock/points.js';

export default class PointsModel extends Observable {
  #points = getMockPoints();
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Point does not exist');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, updatedPoint);
  }

  addPoint (updateType, newPoint) {
    this.#points = [
      newPoint,
      ...this.#points
    ];
    this._notify(updateType, newPoint);
  }

  deletePoint (updateType, deletedPoint) {
    const index = this.#points.findIndex((point) => point.id === deletedPoint.id);

    if (index === -1) {
      throw new Error('Point does not exist');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
