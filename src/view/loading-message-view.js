import AbstractView from '../framework/view/abstract-view.js';

function createLoadingViewTemplate (message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class LoadingMessageView extends AbstractView {
  #message = '';

  constructor (message) {
    super();
    this.#message = message;
  }

  get template () {
    return createLoadingViewTemplate(this.#message);
  }
}
