import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
import AdapterService from '../service/adapter-service.js';

export default class PointsModel extends Observable {
  #adapterService = new AdapterService();
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #isFailed = false;

  constructor ({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adapterService.adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch (error) {
      this.#isFailed = true;
      this._notify(UpdateType.FAILED);
    }
  }

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  get isFailed() {
    return this.#isFailed;
  }

  async updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Point does not exist');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(updatedPoint);
      const pointForUpdate = this.#adapterService.adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        pointForUpdate,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, pointForUpdate);
    } catch (error) {
      throw new Error('Cannot update point');
    }
  }

  async addPoint (updateType, newPoint) {
    try {
      const response = await this.#pointsApiService.addPoint(newPoint);
      const pointForUpdate = this.#adapterService.adaptToClient(response);
      this.#points = [
        pointForUpdate,
        ...this.#points
      ];
      this._notify(updateType, pointForUpdate);
    } catch (error) {
      throw new Error('Cannot add point');
    }
  }

  async deletePoint (updateType, deletedPoint) {
    const index = this.#points.findIndex((point) => point.id === deletedPoint.id);

    if (index === -1) {
      throw new Error('Point does not exist');
    }

    try {
      await this.#pointsApiService.deletePoint(deletedPoint);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (error) {
      throw new Error('Cannot delete point');
    }
  }
}
