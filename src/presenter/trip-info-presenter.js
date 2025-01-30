import { DateFormat } from '../const';
import { remove, render, RenderPosition } from '../framework/render.js';
import { formatDate } from '../utils/date';
import { getCheckedOffersByType, getDestinationById } from '../utils/point';
import {getPointsDateDifference} from '../utils/sorting.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;

  #pointsModel = null;
  #sortedPoints = [];
  #offers = [];
  #destinations = [];
  #tripInfoComponent = null;
  #destinationsTitle = '';
  #startDate = '';
  #endDate = '';
  #totalCost = 0;

  constructor ({tripMainContainer, pointsModel}) {
    this.#tripInfoContainer = tripMainContainer;
    this.#pointsModel = pointsModel;
    this.#sortedPoints = [...this.#pointsModel.points].sort(getPointsDateDifference);
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#tripInfoComponent !== null) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      destinationsTitle: this.destinationsTitle,
      startDate: this.startDate,
      endDate: this.endDate,
      totalCost: this.totalCost,
    });

    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  destroy () {
    if (this.#tripInfoComponent !== null) {
      remove(this.#tripInfoComponent);
    }
  }

  get destinationsTitle () {
    const destinationsNames = this.#sortedPoints.map((point) => getDestinationById(this.#destinations, point.destination).name);

    if (destinationsNames.length <= 3) {
      this.#destinationsTitle = destinationsNames.join(' &mdash; ');
    } else {
      this.#destinationsTitle = `${destinationsNames[0]} &mdash; ... &mdash;  ${destinationsNames[destinationsNames.length - 1]}`;
    }

    return this.#destinationsTitle;
  }

  get startDate () {
    this.#startDate = formatDate(this.#sortedPoints[0].dateFrom, DateFormat.TRIP_INFO);
    return this.#startDate;
  }

  get endDate () {
    this.#endDate = formatDate(this.#sortedPoints[this.#sortedPoints.length - 1].dateTo, DateFormat.TRIP_INFO);
    return this.#endDate;
  }

  get totalCost () {
    const checkedOffersPrices = this.#sortedPoints.map((point) => getCheckedOffersByType(point, this.#offers).map(({price}) => price));
    const totalCheckedOffersPrice = checkedOffersPrices.flat().reduce((acc, num) => acc + num, 0);

    const totalTripBasePriceCost = this.#sortedPoints.map((point) => point.basePrice).reduce((acc, num) => acc + num, 0);
    this.#totalCost = totalTripBasePriceCost + totalCheckedOffersPrice;
    return this.#totalCost;
  }

  #handleModelEvent = () => {
    this.init();
  };
}
