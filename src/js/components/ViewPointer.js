class ViewPointer {
  constructor({ position, thumbElem }) {
    this.thumbElem = thumbElem;
    this.createPointer(position);
  }

  createPointer(position) {
    let pointer = position !== 'vertical' ? '<div class="slider__pointer">' : '<div class="slider__pointer slider__pointer--left">';
    this.thumbElem.append($(pointer));
  }

  showValueOnPointers({ index, value }) {
    let pointer = this.thumbElem.find('.slider__pointer');
    pointer.eq(index).text(value);
  }
}

export default ViewPointer;