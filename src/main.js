import { AUTHORIZATION, END_POINT } from './const.js';
import { render } from './framework/render.js';
import FiltersModel from './model/filters-model.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsBoardPresenter from './presenter/points-board-presenter.js';
import PointsApiService from './service/points-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripPointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();
const filtersPresenter = new FiltersPresenter({
  filtersContainer,
  pointsModel,
  filtersModel,
});

const pointsBoardPresenter = new PointsBoardPresenter({
  tripMainContainer,
  pointsBoardContainer: tripPointsBoardContainer,
  pointsModel,
  filtersModel,
  onNewPointFormClose: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick
});

render(newPointButtonComponent, tripMainContainer);

function handleNewPointButtonClick () {
  pointsBoardPresenter.createNewPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose () {
  newPointButtonComponent.element.disabled = false;
}

filtersPresenter.init();
pointsBoardPresenter.init();
pointsModel.init().finally(() => {
  if (pointsModel.isFailure) {
    return;
  }
  newPointButtonComponent.element.disabled = false;
});
