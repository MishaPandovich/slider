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

    let thumbElem = this.elem.find('.slider__thumb');
    thumbElem.on('mousedown', this.onElemMouseDown.bind(this));

    if (this.hasPointer) {
      this.addPointers({ position: this.position, thumbElem });
    }

    return thumbElem;
  }

  createThumb(modifier='first') {
    let slider = this.elem.parent('.slider'),
        thumbElem = $('<div class="slider__thumb">'),
        input = $('<input type="number" class="slider__input">');
    thumbElem.addClass('slider__thumb--' + modifier);
    input.addClass('slider__input--' + modifier);
    this.elem.append(thumbElem);
    slider.append(input);
  }

  addPointers({ position, thumbElem }) {
    this.viewPointer = new ViewPointer({ position, thumbElem });
  }

  showValue({ elem, value }) {
    if (this.viewPointer) {
      this.viewPointer.showValueOnPointers({ elem, value });
    }
  }

  onElemMouseDown(e) {
    this.publish('onElemMouseDown', e);
    return false;
  }
}

export default ViewThumb;