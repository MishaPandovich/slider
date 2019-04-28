import Observer from './Observer';

class View extends Observer {
  constructor(slider) {
    super();
    this.elem = $(slider).find('.slider__runner'),
    this.thumbElem = $(slider).find('.slider__thumb'),
    this.change = $(slider).find('.slider__change'),
    this.button = $(slider).find('.slider__button')
  }

  initEventListeners() {
    this.elem.on('dragstart', this.preventDefault);
    this.elem.on('mousedown', this.onElemMouseDown.bind(this));
  }

  viewValue(value, pixelsPerValue) {
    this.thumbElem.css('left', value * pixelsPerValue + 'px');
    this.change.val(value);
  }

  startDrag(startClientX, startClientY) {
    this.thumbCoords = this.thumbElem[0].getBoundingClientRect();
    this.shiftX = startClientX - this.thumbCoords.left;
    this.shiftY = startClientY - this.thumbCoords.top;

    $(document).on('mousemove', this.documentMouseMove.bind(this));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
  }

  preventDefault() {
    return false;
  }

  onElemMouseDown(e) {
    this.startDrag(e.clientX, e.clientY);
    return false;
  }

  documentMouseMove(e) {
    this.publish('documentMouseMove', e);
  }

  onDocumentMouseUp() {
    $(document).off('mousemove');
    $(document).off('mouseup');
  }
}

export default View;