import { Mode, UpdateType, UserAction } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { isDatesEqual, isPricesEqual } from '../utils/date.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #offers = null;
  #point = null;
  #destinations = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;

  constructor ({pointsListContainer, offers, destinations, onDataChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointItemView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: this.#handleArrowClick,
      onFavoriteClick: this.#handleFavouriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: this.#handleFormCollapse,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
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
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleFormCollapse = () => {
    this.resetView();
  };

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
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleArrowClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (updatedPoint) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, updatedPoint.dateFrom)
    || !isDatesEqual(this.#point.dateTo, updatedPoint.dateTo)
    || !isPricesEqual(this.#point.basePrice, updatedPoint.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint
    );
    this.#replaceFormToCard();
  };

  #handleFavouriteClick = () => {
    const update = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      update
    );
  };

  #handleDeleteClick = (update) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      update,
    );
  };
}
