import AbstractView from '../framework/view/abstract-view.js';

function createPointsBoardTemplate() {
  return `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
        </section>`;
}

export default class PointsBoardView extends AbstractView {
  get template() {
    return createPointsBoardTemplate();
  }
}
