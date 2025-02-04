import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #pointEditComponent = null;
  #destinations = null;
  #offers = null;

  #handleDataChange = null;
  #handleNewPointDestroy = null;

  constructor ({pointsListContainer, destinations, offers, onDataChange, onNewPointDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
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
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving () {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }
}
