import { Mode } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #point = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;

  constructor ({pointsListContainer, pointsModel, onDataChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointItemView({
      point: this.#point,
      offers: [...this.#pointsModel.getOffersById(this.#point.type, this.#point.offers)],
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavouriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#pointsModel.getOffersByType(this.#point.type),
      checkedOffers: [...this.#pointsModel.getOffersById(this.#point.type, this.#point.offers)],
      destination: this.#pointsModel.getDestinationById(this.#point.destination),
      destinations: this.#pointsModel.destinations,
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
