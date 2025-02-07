import { DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, LoadingMessage, TimeLimit, UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { filterPoints } from '../utils/filter.js';
import {sortItems} from '../utils/sorting.js';
import LoadingMessageView from '../view/loading-message-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointsBoardView from '../view/points-board-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import PointPresenter from './point-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';

export default class PointsBoardPresenter {
  #pointsBoardContainer = null;
  #tripMainContainer = null;
  #pointsModel = null;
  #filtersModel = null;
  #pointsPresenters = new Map();
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentFilterType = DEFAULT_FILTER_TYPE;
  #isLoading = true;
  #loadingComponent = new LoadingMessageView(LoadingMessage.LOADING);
  #failedLoadingComponent = new LoadingMessageView(LoadingMessage.FAILED);

  #newPointPresenter = null;
  #tripSortComponent = null;
  #pointsListComponent = new PointsListView();
  #pointsBoardComponent = new PointsBoardView();
  #noPointsComponent = null;
  #tripInfoPresenter = null;

  #handleNewPointFormClose = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({tripMainContainer, pointsBoardContainer, pointsModel, filtersModel, onNewPointFormClose}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#tripMainContainer = tripMainContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#handleNewPointFormClose = onNewPointFormClose;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#currentFilterType = this.#filtersModel.currentFilter;
    const filteredPoints = filterPoints([...this.#pointsModel.points], this.#currentFilterType);
    return sortItems(this.#currentSortType, filteredPoints);
  }

  get offers () {
    return this.#pointsModel.offers;
  }

  get destinations () {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = async (actionType, updateType, updatedItem) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(updatedItem.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatedItem);
        } catch (error) {
          this.#pointsPresenters.get(updatedItem.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatedItem);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(updatedItem.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatedItem);
        } catch (error) {
          this.#pointsPresenters.get(updatedItem.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true);
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#newPointPresenter = new NewPointPresenter({
          pointsListContainer: this.#pointsListComponent.element,
          destinations: this.destinations,
          offers: this.offers,
          onDataChange: this.#handleViewAction,
          onNewPointDestroy: this.#handleNewPointCancel
        });
        this.#renderBoard();
        break;
      case UpdateType.FAILED:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#noPointsComponent);
        remove(this.#tripSortComponent);
        this.#renderFailedLoading();
        break;
    }
  };

  #renderLoading () {
    render(this.#loadingComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderFailedLoading () {
    render(this.#failedLoadingComponent, this.#pointsBoardComponent.element, RenderPosition.BEFOREEND);
  }

  createNewPoint() {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filtersModel.setCurrentFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);

    if (this.points.length === 0) {
      if (this.#noPointsComponent) {
        remove(this.#noPointsComponent);
      }
      this.#renderPointsList();
    }

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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderInfo();
    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints();
  }

  #renderSort () {
    this.#tripSortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortChangeHandler
    });

    render(this.#tripSortComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    this.#noPointsComponent = new NoPointsView({filterType: this.#currentFilterType});
    render(this.#noPointsComponent, this.#pointsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList () {
    if (this.#pointsListComponent === null) {
      this.#pointsListComponent = new PointsListView();
    }
    render(this.#pointsListComponent, this.#pointsBoardComponent.element);
  }

  #clearBoard (resetSortType = false) {
    this.#newPointPresenter.destroy();
    if (this.#tripInfoPresenter !== null) {
      this.#tripInfoPresenter.destroy();
    }
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#loadingComponent);
    remove(this.#tripSortComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  }

  #renderPoints () {
    this.points.forEach((item) => this.#renderPoint(item));
  }

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
    this.#renderBoard();
  };

  #renderInfo() {
    this.#tripInfoPresenter = new TripInfoPresenter({
      tripMainContainer: this.#tripMainContainer,
      pointsModel: this.#pointsModel,
    });
    this.#tripInfoPresenter.init();
  }
}
