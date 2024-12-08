import { render, RenderPosition } from '../render.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class PointsBoardPresenter {
  tripSortComponent = new TripSortView();
  pointsListComponent = new PointsListView();
  pointEditComponent = new PointEditView();

  constructor({pointsBoardContainer}) {
    this.pointsBoardContainer = pointsBoardContainer;
  }

  init() {
    render(this.tripSortComponent, this.pointsBoardContainer);
    render(this.pointsListComponent, this.pointsBoardContainer);
    render(this.pointEditComponent, this.pointsListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new PointItemView(), this.pointsListComponent.getElement());
    }
  }
}
