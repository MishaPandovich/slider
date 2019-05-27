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

    this.elem.append($('<div class="slider__tracker">'));
    this.tracker = this.elem.find('.slider__tracker');

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

  showTracker() {
    if (this.position !== 'vertical') {
      var css1 = 'left',
          css2 = 'right',
          elemSize = this.elem.width(),
          thumbElemSize = this.thumbElem.width();
    }
    else {
      var css1 = 'top',
          css2 = 'bottom',
          elemSize = this.elem.height(),
          thumbElemSize = this.thumbElem.height();
    }

    if (this.thumbElem.length === 1) {
      this.tracker.css(css1, 1);
      this.tracker.css(css2, elemSize - parseInt(this.thumbElem.css(css1)) - 2);
    }
    else {
      this.tracker.css(css1, parseInt(this.thumbElem.eq(0).css(css1)) + thumbElemSize - 2);
      this.tracker.css(css2, elemSize - parseInt(this.thumbElem.eq(1).css(css1)) - 2);
    }
  }

  onElemMouseDown(e) {
    this.publish('onElemMouseDown', e);
    return false;
  }
}

export default ViewThumb;