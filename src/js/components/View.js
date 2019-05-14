import Observer from './Observer';

class View extends Observer {
  constructor(slider) {
    super();
    this.slider = $(slider);
    this.elem = this.slider.find('.slider__runner'),
    this.thumbElem = this.elem.find('.slider__thumb'),
    this.change = this.slider.find('.slider__change')
  }

  initEventListeners() {
    this.thumbElem.on('mousedown', this.onElemMouseDown.bind(this));
    this.change.on('focusout', (e) => { this.inputChange(e.target) });
  }

  addSecondThumb() {
    let secondThumbElem = $('<div class="slider__thumb slider__thumb--second">');
    this.elem.append(secondThumbElem);

    let secondChange = $('<input type="number" class="slider__change slider__change--second">');
    this.elem.parent('.slider').append(secondChange);

    this.thumbElem = this.elem.find('.slider__thumb');
    this.change = this.slider.find('.slider__change');
  }

  setInputsAttr(min, max, step) {
    this.change.attr({
      min: min,
      max: max,
      step: step
    });
  }

  showVertical() {
    this.elem.addClass('slider__runner--vertical');
  }

  addPointer(position) {
    let pointer = position !== 'vertical' ? '<div class="slider__pointer">' : '<div class="slider__pointer slider__pointer--left">';
    this.thumbElem.append($(pointer));
  }

  showValue(elem, calcValue, min, pixelsPerValue, position) {
    let css = position !== 'vertical' ? 'left' : 'top';
    let cssValue = (calcValue - min) * pixelsPerValue;

    elem.css(css, cssValue + 'px');

    if (elem.hasClass('slider__thumb--first')) {
      this.change.eq(0).val(calcValue);
    }
    else {
      this.change.eq(1).val(calcValue);
    }

    let pointer = elem.find('.slider__pointer');
    if (pointer) {
      pointer.html(calcValue);
    }
  }

  onElemMouseDown(e) {
    let elem = $(e.target).closest('.slider__thumb');
    let thumbCoords = elem[0].getBoundingClientRect();
    this.shiftX = e.clientX - thumbCoords.left;
    this.shiftY = e.clientY - thumbCoords.top;
    this.sliderCoords = elem[0].parentElement.getBoundingClientRect();

    $(document).on('mousemove', this.documentMouseMove.bind(this, elem[0]));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
    return false;
  }

  inputChange(elem, e) {
    this.publish('inputChange', elem);
  }

  documentMouseMove(elem, e) {
    this.publish('documentMouseMove', elem, e);
  }

  onDocumentMouseUp() {
    $(document).off('mousemove');
    $(document).off('mouseup');
  }
}

export default View;