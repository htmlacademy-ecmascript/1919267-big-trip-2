import { Method, Url } from '../const.js';
import ApiService from '../framework/api-service.js';
import AdapterService from './adapter-service.js';

export default class PointsApiService extends ApiService {
  #adapterService = new AdapterService();

  get points () {
    return this._load({url: Url.POINTS})
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({url: Url.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({url: Url.OFFERS})
      .then(ApiService.parseResponse);
  }

  async updatePoint (point) {
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adapterService.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }
}
