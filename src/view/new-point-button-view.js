import AbstractView from '../framework/view/abstract-view.js';

function createAddEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>';
}

export default class NewPointButtonView extends AbstractView {
  #handleNewPointButtonClick = null;

  constructor ({onNewPointButtonClick}) {
    super();
    this.#handleNewPointButtonClick = onNewPointButtonClick;

    this.element.addEventListener('click', this.#newPointClickHandler);
  }

  get template() {
    return createAddEventButtonTemplate();
  }

  #newPointClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointButtonClick();
  };
}
