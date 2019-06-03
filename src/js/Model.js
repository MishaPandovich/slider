import Observer from './Observer';

class Model extends Observer {
  constructor(options) {
    super();
    this.step = Math.round(options.step) || 1,
    this.min = Math.round(options.min / options.step) * options.step,
    this.max = Math.floor(options.max / options.step) * options.step,
    this.current = options.current > this.max ? this.max : options.current,
    this.calcValue = []
  }

  setValue({ index, value }) {
    value = this.checkValue({
      value: Math.round(value / this.step) * this.step,
      index
    });
    this.calcValue[index] = value;

    this.publish('changeValue', { index, value });
  }

  checkValue({ value, index }) {
    if (value < this.min) {
      value = this.min;
    }
    else if (value > this.max) {
      value = this.max;
    }

    value = index
          ? (value < this.calcValue[0]) ? this.calcValue[0] : value
          : (value > this.calcValue[1]) ? this.calcValue[1] : value;

    return value;
  }
}

export default Model;