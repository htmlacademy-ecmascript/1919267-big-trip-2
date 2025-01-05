import { render, RenderPosition, replace } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import PointsBoardView from '../view/points-board-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class PointsBoardPresenter {
  #pointsBoardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  #tripSortComponent = new TripSortView();
  #pointsListComponent = new PointsListView();
  #pointsBoardComponent = new PointsBoardView();
  #noPointsComponent = new NoPointsView();

  constructor({pointsBoardContainer, pointsModel}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderPoint (point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItemView({
      point,
      offers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationById(point.destination),
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      offers: this.#pointsModel.getOffersByType(point.type),
      checkedOffers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationById(point.destination),
      destinations: this.#pointsModel.destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }
    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsListComponent.element);
  }

  #renderBoard () {
    render(this.#pointsBoardComponent, this.#pointsBoardContainer);

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();

  }

  #renderSort () {
    render(this.#tripSortComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointsComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    render(this.#pointsListComponent, this.#pointsBoardComponent.element);
    this.#renderPoints();
  }

  #renderPoints () {
    this.#boardPoints.forEach((item) => this.#renderPoint(item));
  }
}
