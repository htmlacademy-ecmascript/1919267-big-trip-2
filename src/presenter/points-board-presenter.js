import { AvailableSortType, DEFAULT_SORT_TYPE, SortType } from '../const.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { filterItems } from '../utils/filter.js';
import {sortItems} from '../utils/sorting.js';
import NoPointsView from '../view/no-points-view.js';
import PointsBoardView from '../view/points-board-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import PointPresenter from './point-presenter.js';

export default class PointsBoardPresenter {
  #pointsBoardContainer = null;
  #pointsModel = null;
  #pointsPresenters = new Map();
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentFilterType = null;

  #newPointPresenter = null;
  #tripSortComponent = null;
  #pointsListComponent = new PointsListView();
  #pointsBoardComponent = new PointsBoardView();
  #noPointsComponent = new NoPointsView();

  #handleNewPointFormClose = null;

  constructor({pointsBoardContainer, pointsModel, onNewPointFormClose}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
    this.#handleNewPointFormClose = onNewPointFormClose;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#currentFilterType = this.#pointsModel.currentFilter;
    const filteredPoints = filterItems([...this.#pointsModel.points], this.#currentFilterType);
    return sortItems(this.#currentSortType, filteredPoints);
  }

  get offers () {
    return this.#pointsModel.offers;
  }

  get destinations () {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      destinations: this.destinations,
      offers: this.offers,
      onNewPointDestroy: this.#handleNewPointCancel
    });
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, updatedItem) => ({actionType, updateType, updatedItem});

  #handleModelEvent = (updateType, data) => ({updateType, data});

  createNewPoint() {
    this.#currentSortType = DEFAULT_SORT_TYPE;

    if (this.points.length === 0) {
      if (this.#noPointsComponent) {
        remove(this.#noPointsComponent);
      }
      this.#renderPointsList();
    }

    this.#clearBoard();
    this.#renderPoints();
    this.#newPointPresenter.init();
  }

  #handleNewPointCancel = () => {
    if (this.points.length === 0) {
      remove(this.#tripSortComponent);
      remove(this.#pointsListComponent);
      this.#renderNoPoints();
    }
    this.#handleNewPointFormClose();
  };

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
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
    this.#renderPoints();
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
    if (this.#pointsListComponent === null) {
      this.#pointsListComponent = new PointsListView();
    }
    render(this.#pointsListComponent, this.#pointsBoardComponent.element);
  }

  #clearBoard () {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #renderPoints () {
    this.points.forEach((item) => this.#renderPoint(item));
  }

  #handleDataChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderSort();
    this.#renderBoard();
  };
}
