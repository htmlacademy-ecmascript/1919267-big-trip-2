import { render } from './framework/render.js';
import FiltersModel from './model/filters-model.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsBoardPresenter from './presenter/points-board-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
//import TripInfoView from './view/trip-info-view.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripPointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const filtersPresenter = new FiltersPresenter({
  filtersContainer,
  pointsModel,
  filtersModel,
});
const pointsBoardPresenter = new PointsBoardPresenter({
  pointsBoardContainer: tripPointsBoardContainer,
  pointsModel,
  filtersModel,
  onNewPointFormClose: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick
});

//render(new TripInfoView(pointsModel), tripMainContainer, RenderPosition.AFTERBEGIN);
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
