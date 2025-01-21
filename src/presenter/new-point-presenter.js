import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #pointEditComponent = null;
  #destinations = null;
  #offers = null;

  #handleNewPointDestroy = null;

  constructor ({pointsListContainer, destinations, offers, onNewPointDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleNewPointDestroy = onNewPointDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      offers: this.#offers,
      destinations: this.#destinations,
      isNewPoint: true,
      onArrowClick: () => {},
      onFormSubmit: () => {}
    });

    render(
      this.#pointEditComponent,
      this.#pointsListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escapeKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleNewPointDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
  }

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
