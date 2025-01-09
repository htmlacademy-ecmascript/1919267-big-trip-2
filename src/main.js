import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/points-model.js';
import PointsBoardPresenter from './presenter/points-board-presenter.js';
import { generateFilters } from './utils/filter.js';
import AddEventButtonView from './view/add-event-button-view.js';
import FiltersFormView from './view/filters-form-view.js';
import TripInfoView from './view/trip-info-view.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripPointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filters = generateFilters(pointsModel.points);
const currentFilter = pointsModel.currentFilter;
const pointsBoardPresenter = new PointsBoardPresenter({
  pointsBoardContainer: tripPointsBoardContainer,
  pointsModel
});

render(new TripInfoView(pointsModel), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersFormView({filters, currentFilter}), filtersContainer);
render(new AddEventButtonView(), tripMainContainer);
pointsBoardPresenter.init();
