import Observer from './Observer';

class View extends Observer {
  constructor(slider) {
    super();
    this.elem = $(slider).find('.slider__runner'),
    this.thumbElem = this.elem.find('.slider__thumb'),
    this.change = $(slider).find('.slider__change')
  }

  initEventListeners() {
    this.thumbElem.on('mousedown', this.onElemMouseDown.bind(this));
    this.change.on('focusout', this.inputChange.bind(this));
  }

  showVertical() {
    this.elem.addClass('slider__runner--vertical');
  }

  showPointer(position) {
    let pointer = position !== 'vertical' ? $('<div class="slider__pointer">') : $('<div class="slider__pointer slider__pointer--left">');
    this.thumbElem.append(pointer);
  }

  showValue(calcValue, min, pixelsPerValue, position) {
    let css = position !== 'vertical' ? 'left' : 'top';
    this.thumbElem.css(css, (calcValue - min) * pixelsPerValue + 'px');
    this.change.val(calcValue);

    let pointer = this.thumbElem.find('.slider__pointer');
    if (pointer) {
      pointer.html(calcValue);
    }
  }

  onElemMouseDown(e) {
    let thumbCoords = e.target.getBoundingClientRect();
    this.shiftX = e.clientX - thumbCoords.left;
    this.shiftY = e.clientY - thumbCoords.top;
    this.sliderCoords = e.target.parentElement.getBoundingClientRect();

    $(document).on('mousemove', this.documentMouseMove.bind(this));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
    return false;
  }

  inputChange() {
    this.publish('inputChange');
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