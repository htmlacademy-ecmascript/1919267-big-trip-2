import { Url } from '../const.js';
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
}
