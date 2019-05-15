import Observer from './Observer';

class Model extends Observer {
  constructor(options) {
    super();
    this.step = Math.round(options.step) || 1,
    this.min = Math.round(options.min / options.step) * options.step,
    this.max = Math.trunc(options.max / options.step) * options.step,
    this.current = options.current > options.max ? options.max : options.current,
    this.calcValue = []
  }

  setValue(options) {
    let elem = $(options.elem),
        res = this.moveTo(Math.round(options.value / this.step) * this.step, elem);

    if (elem.hasClass('slider__thumb--first')) {
      this.calcValue[0] = res;
    }
    else {
      this.calcValue[1] = res;
    }

    this.publish('changeValue', {
      elem: elem,
      value: res
    });
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