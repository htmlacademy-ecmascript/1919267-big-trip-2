import { render, replace } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #point = null;

  constructor ({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointsModel = pointsModel;
  }

  init (point) {
    this.#point = point;

    this.#pointComponent = new PointItemView({
      point,
      offers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationById(point.destination),
      onEditClick: this.#handleEditClick
    });

    this.#pointEditComponent = new PointEditView({
      point,
      offers: this.#pointsModel.getOffersByType(point.type),
      checkedOffers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationById(point.destination),
      destinations: this.#pointsModel.destinations,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#pointsListContainer);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
