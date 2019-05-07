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
    this.elem.on('mousedown', this.onElemMouseDown.bind(this));
    this.button.on('click', this.buttonClick.bind(this));
  }

  viewValue(calcValue, min, pixelsPerValue) {
    this.thumbElem.css('left', (calcValue - min) * pixelsPerValue + 'px');
    this.change.val(calcValue);
  }

  onElemMouseDown() {
    $(document).on('mousemove', this.documentMouseMove.bind(this));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
    return false;
  }

  buttonClick() {
    this.publish('buttonClick');
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