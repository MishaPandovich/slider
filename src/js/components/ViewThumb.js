import ViewPointer from './ViewPointer.js';
import Observer from './Observer';

class ViewThumb extends Observer {
  constructor({ elem, position, hasInterval, hasPointer }) {
    super();
    this.elem = elem;
    this.position = position;
    this.hasInterval = hasInterval;
    this.hasPointer = hasPointer;
  }

  addThumbs() {
    this.createThumb();

    if (this.hasInterval) {
      this.createThumb('second');
    }

    this.thumbElem = this.elem.find('.slider__thumb');
    this.thumbElem.on('mousedown', this.onElemMouseDown.bind(this));

    if (this.hasPointer) {
      this.addPointers(this.position);
    }

    return this.thumbElem;
  }

  createThumb(modifier='first') {
    let slider = this.elem.parent('.slider'),
        thumb = $('<div class="slider__thumb">'),
        input = $('<input type="number" class="slider__input">');
    thumb.addClass('slider__thumb--' + modifier);
    input.addClass('slider__input--' + modifier);
    this.elem.append(thumb);
    slider.append(input);
  }

  addPointers(position) {
    this.viewPointer = new ViewPointer({
      position,
      thumbElem: this.thumbElem
    });
  }

  showValue({ index, value, css, cssValue }) {
    this.thumbElem.eq(index).css(css, cssValue);

    if (this.viewPointer) {
      this.viewPointer.showValueOnPointers({ index, value });
    }
  }

  onElemMouseDown(e) {
    this.publish('onElemMouseDown', e);
    return false;
  }
}

export default ViewThumb;