import { render } from '../framework/render.js';
import PointItemView from '../view/point-item-view.js';
import PointsListView from '../view/points-list-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class PointsBoardPresenter {
  tripSortComponent = new TripSortView();
  pointsListComponent = new PointsListView();

  constructor({pointsBoardContainer, pointsModel}) {
    this.pointsBoardContainer = pointsBoardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.points];
    render(this.tripSortComponent, this.pointsBoardContainer);
    render(this.pointsListComponent, this.pointsBoardContainer);

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointItemView({
        point: this.boardPoints[i],
        offers: [...this.pointsModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination)
      }), this.pointsListComponent.element);
    }
  }
}
