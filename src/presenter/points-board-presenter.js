import { render } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
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
    this.boardPoints = [...this.pointsModel.getPoints()];
    render(this.tripSortComponent, this.pointsBoardContainer);
    render(this.pointsListComponent, this.pointsBoardContainer);
    render(new PointEditView({
      point: this.boardPoints[0],
      offers: this.pointsModel.getOffersByType(this.boardPoints[0].type),
      checkedOffers: [...this.pointsModel.getOffersById(this.boardPoints[0].type, this.boardPoints[0].offers)],
      destination: this.pointsModel.getDestinationById(this.boardPoints[0].destination),
      destinations: this.pointsModel.getDestinations()
    }), this.pointsListComponent.element);

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointItemView({
        point: this.boardPoints[i],
        offers: [...this.pointsModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination)
      }), this.pointsListComponent.element);
    }
  }
}
