import Observer from './Observer';

class Model extends Observer {
  constructor(options) {
    super();
    this.min = Math.round(options.min / options.step) * options.step,
    this.max = options.max,
    this.current = options.current > options.max ? options.max : options.current,
    this.step = Math.round(options.step) || 1,
    this.position = options.position,
    this.hasPointer = options.hasPointer,
    this.hasInterval = options.hasInterval,
    this.calcValue = []
  }

  getCoords(elemWidth, thumbElemWidth) {
    this.rightEdge = elemWidth - thumbElemWidth;
    this.pixelsPerValue = this.rightEdge / (this.max - this.min);
  }

  setValue(value, elem) {
    elem = $(elem);
    let res = this.moveTo(Math.round(value / this.step) * this.step, elem);

    if (elem.hasClass('slider__thumb--first')) {
      this.calcValue[0] = res;
    }
    else {
      this.calcValue[1] = res;
    }
    
    this.publish('changeValue', elem, res);
  }

  moveTo(checkValue, elem) {
    if (checkValue < this.min) {
      checkValue = this.min;
    }
    else if (checkValue > this.max) {
      checkValue = this.max;
    }

    if (elem.hasClass('slider__thumb--first')) {
      checkValue = (checkValue > this.calcValue[1]) ? this.calcValue[1] : checkValue;
    }
    else {
      checkValue = (checkValue < this.calcValue[0]) ? this.calcValue[0] : checkValue;
    }

    return checkValue;
  }
}

export default Model;