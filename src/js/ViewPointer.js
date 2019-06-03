class ViewPointer {
  constructor({ isVertical, thumbElem }) {
    this.isVertical = isVertical;
    this.thumbElem = thumbElem;
  }

  createPointer() {
    let pointer = !this.isVertical ? '<div class="slider__pointer">' : '<div class="slider__pointer slider__pointer--left">';
    this.thumbElem.append($(pointer));
  }

  showValueOnPointers({ index, value }) {
    let pointer = this.thumbElem.eq(index).children('.slider__pointer');
    pointer.text(value);
  }
}

export default ViewPointer;