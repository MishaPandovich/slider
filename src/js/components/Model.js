class Model {
  constructor(options) {
    this.max = options.max,
    this.value = options.value,
    this.step = options.step
  }

  getCoords(elemWidth, thumbElemWidth) {
    this.rightEdge = elemWidth - thumbElemWidth;
    this.pixelsPerValue = this.rightEdge / this.max;
  }

  moveTo(newLeft) {
    if (newLeft < 0) {
      newLeft = 0;
    }

    if (newLeft > this.rightEdge) {
      newLeft = this.rightEdge;
    }

    return newLeft;
  }

  setValue(value, hasRatio=false) {
    let ratio = 1;

    if (hasRatio) {
      ratio = this.pixelsPerValue;
    }

    this.pixelsWithStep = Math.round(value / this.step / ratio) * this.step;
  }
}

export default Model;