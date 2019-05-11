import Observer from './Observer';

class Model extends Observer {
  constructor(options) {
    super();
    this.min = Math.round(options.min / options.step) * options.step,
    this.max = options.max,
    this.current = options.current > options.max ? options.max : options.current,
    this.step = options.step,
    this.position = options.position,
    this.hasPointer = options.hasPointer
  }

  getCoords(elemWidth, thumbElemWidth) {
    this.rightEdge = elemWidth - thumbElemWidth;
    this.pixelsPerValue = this.rightEdge / (this.max - this.min);
  }

  moveTo(newLeft) {
    if (newLeft < this.min) {
      newLeft = this.min;
    }

    if (newLeft > this.max) {
      newLeft = this.max;
    }

    return newLeft;
  }

  setValue(value) {
    this.calcValue = this.moveTo(Math.round(value / this.step) * this.step);
    this.publish('changeValue');
  }
}

export default Model;