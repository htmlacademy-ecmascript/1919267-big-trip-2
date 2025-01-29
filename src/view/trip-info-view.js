import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate({ title, startDate, endDate, totalCost }) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>

              <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${String(totalCost)}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #destinationsTitle = '';
  #startDate = '';
  #endDate = '';
  #totalCost = 0;

  constructor ({destinationsTitle, startDate, endDate, totalCost}) {
    super();
    this.#destinationsTitle = destinationsTitle;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate({
      title: this.#destinationsTitle,
      startDate: this.#startDate,
      endDate: this.#endDate,
      totalCost: this.#totalCost
    });
  }
}
