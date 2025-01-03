import { render, replace } from '../framework/render.js';
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
      offers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      checkedOffers: [...this.#pointsModel.getOffersById(this.#boardPoints[0].type, this.#boardPoints[0].offers)],
      destination: this.#pointsModel.getDestinationById(this.#boardPoints[0].destination),
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
      render(new NoPointsView(), this.#pointsBoardComponent.element);
    } else {
      render(this.#tripSortComponent, this.#pointsBoardComponent.element);
      render(this.#pointsListComponent, this.#pointsBoardComponent.element);
    }

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }
}
