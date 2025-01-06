import { render, RenderPosition } from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import PointsBoardView from '../view/points-board-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';

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
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      pointsModel: this.#pointsModel,
    });

    pointPresenter.init(point);
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
