import { AvailableSortType, DEFAULT_SORT_TYPE, SortType } from '../const.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { filterPoints } from '../utils/filter.js';
import {sortItems} from '../utils/sorting.js';
import NoPointsView from '../view/no-points-view.js';
import PointsBoardView from '../view/points-board-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';

export default class PointsBoardPresenter {
  #pointsBoardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #pointsPresenters = new Map();
  #currentSortType = DEFAULT_SORT_TYPE;

  #tripSortComponent = null;
  #pointsListComponent = new PointsListView();
  #pointsBoardComponent = new PointsBoardView();
  #noPointsComponent = new NoPointsView();

  constructor({pointsBoardContainer, pointsModel}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
  }

  get points () {
    const filterType = this.#pointsModel.currentFilter;
    const filteredPoints = filterPoints(this.#pointsModel.points, filterType);
    return sortItems(this.#currentSortType, filteredPoints);
  }

  get offers () {
    return this.#pointsModel.offers;
  }

  get destinations () {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleDataChange,
      onModeChange:this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderBoard () {
    render(this.#pointsBoardComponent, this.#pointsBoardContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderSort () {
    const sortTypes = Object.values(SortType)
      .map((type) => ({
        type,
        isDisabled: !AvailableSortType[type],
      }));

    const prevSortComponent = this.#tripSortComponent;
    this.#tripSortComponent = new TripSortView({
      sortItems: sortTypes,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortChangeHandler
    });

    if(prevSortComponent){
      replace(this.#tripSortComponent, prevSortComponent);
      remove(prevSortComponent);
    }else{
      render(this.#tripSortComponent, this.#pointsBoardContainer);
    }

    render(this.#tripSortComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointsComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    render(this.#pointsListComponent, this.#pointsBoardComponent.element);
    this.#renderPoints();
  }

  #clearPointsList () {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #renderPoints () {
    this.points.forEach((item) => this.#renderPoint(item));
  }

  #handleDataChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderSort();
    this.#renderBoard();
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#boardPoints = sortItems(this.#currentSortType, this.points);
  };
}
