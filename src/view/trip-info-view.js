import { DateFormat } from '../const.js';
import { humanizePointDueDate } from '../utils/date.js';
import AbstractView from '../framework/view/abstract-view.js';

function getTripDate (points) {
  const firstMonth = new Date(points[0].dateFrom).getMonth();
  const lastMonth = new Date(points[points.length - 1].dateFrom).getMonth();
  const dateFormat = firstMonth === lastMonth ? DateFormat.TRIP_INFO_SHORT : DateFormat.TRIP_INFO;

  return `${humanizePointDueDate(points[0].dateFrom, dateFormat)}&nbsp;&mdash;&nbsp;${humanizePointDueDate(points[points.length - 1].dateTo, dateFormat)}`;
}

function getTripTitle (destinations) {
  if (destinations.length > 3) {
    return `${destinations[0].name} &mdash; ... &mdash; ${destinations[destinations.length - 1].name}`;
  }
  return destinations.reduce((acc, item) => `${acc}  &mdash; ${item.name}`, destinations[0].name);
}

function getTripTotalPrice (points) {
  return points.reduce((acc, item) => acc + item.basePrice, points[0].basePrice);
}

function createTripInfoTemplate(points, destinations) {
  if (points.length === 0) {
    return '';
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTripTitle(destinations)}</h1>

              <p class="trip-info__dates">${getTripDate(points)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripTotalPrice(points)}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #pointsModel = null;
  #points = [];
  #destinations = [];

  constructor (pointsModel) {
    super();
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points].toSorted((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    this.#destinations = this.#points.map((point) => this.#pointsModel.getDestinationById(point.destination));
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
