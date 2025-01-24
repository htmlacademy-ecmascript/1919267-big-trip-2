import { FilterTypeNoItemsMessage } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createNoPointsTemplate (filterType) {
  const noPointsMessageValue = FilterTypeNoItemsMessage[filterType];
  return (
    `<p class="trip-events__msg">
      ${noPointsMessageValue}
    </p>`
  );
}

export default class NoPointsView extends AbstractView {
  #currentFilterType = null;

  constructor ({filterType}) {
    super();
    this.#currentFilterType = filterType;
  }

  get template () {
    return createNoPointsTemplate(this.#currentFilterType);
  }
}
