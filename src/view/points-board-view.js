import { createElement } from '../render.js';

function createPointsBoardTemplate() {
  return `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
        </section>`;
}

export default class PointsBoardView {
  getTemplate() {
    return createPointsBoardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
