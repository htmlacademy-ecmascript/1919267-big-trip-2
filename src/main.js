import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsBoardPresenter from './presenter/points-board-presenter.js';
import AddEventButtonView from './view/add-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripPointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filtersPresenter = new FiltersPresenter({
  filtersContainer,
  pointsModel,
});
const pointsBoardPresenter = new PointsBoardPresenter({
  pointsBoardContainer: tripPointsBoardContainer,
  pointsModel
});

render(new TripInfoView(pointsModel), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new AddEventButtonView(), tripMainContainer);

filtersPresenter.init();
pointsBoardPresenter.init();
