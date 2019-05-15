import ViewThumb from './ViewThumb.js';
import ViewPointer from './ViewPointer.js';
import Observer from './Observer';

class View extends Observer {
  constructor(options) {
    super();
    this.slider = $(options.slider);
    this.elem = this.slider.find('.slider__runner');
    this.position = options.position;
    this.hasInterval = options.hasInterval;
    this.hasPointer = options.hasPointer;
  }

  init(options) {
    let passedOptions = {
      min: options.min,
      max: options.max,
      step: options.step
    }

    this.showPosition();
    this.addThumbs();
    this.addPointer();
    this.initEventListeners();
    this.setInputsAttr(passedOptions);
    this.getCoords(passedOptions);
  }

  addThumbs() {
    let viewThumb = new ViewThumb();
    viewThumb.createThumb({
      elem: this.elem
    });

    if (this.hasInterval) {
      viewThumb.createThumb({
        elem: this.elem,
        modifier: 'second'
      });
    }

    this.thumbElem = this.slider.find('.slider__thumb');
    this.input = this.slider.find('.slider__input');
  }

  initEventListeners() {
    this.thumbElem.on('mousedown', this.onElemMouseDown.bind(this));
    this.input.on('focusout', (e) => { this.inputChange(e.target) });
  }

  setInputsAttr(options) {
    this.input.attr({
      min: options.min,
      max: options.max,
      step: options.step
    });
  }

  addPointer() {
    if (this.hasPointer) {
      let viewPointer = new ViewPointer();
      viewPointer.createPointer({
        position: this.position,
        thumbElem: this.thumbElem
      });
    }
  }

  showPosition() {
    if (this.position === 'vertical') {
      this.elem.addClass('slider__runner--vertical');
    }
  }

  getCoords(options) {
    let rightEdge = (this.position !== 'vertical')
                    ? this.elem.width() - this.thumbElem.width()
                    : this.elem.height() - this.thumbElem.height();
    this.pixelsPerValue = rightEdge / (options.max - options.min);
  }

  showValue(options) {
    let elem = options.elem,
        value = options.value,
        css = this.position !== 'vertical' ? 'left' : 'top',
        cssValue = (value - options.min) * this.pixelsPerValue;

    elem.css(css, cssValue + 'px');

    if (elem.hasClass('slider__thumb--first')) {
      this.input.eq(0).val(value);
    }
    else {
      this.input.eq(1).val(value);
    }

    let pointer = elem.find('.slider__pointer');
    if (pointer) {
      pointer.html(value);
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