class ViewPointer {
  constructor({ position, thumbElem }) {
    this.createPointer({ position, thumbElem });
  }

  createPointer({ position, thumbElem }) {
    let pointer = position !== 'vertical' ? '<div class="slider__pointer">' : '<div class="slider__pointer slider__pointer--left">';
    thumbElem.append($(pointer));
  }

  showValueOnPointers({ elem, value }) {
    let pointer = elem.find('.slider__pointer');
    pointer.text(value);
  }
}

export default ViewPointer;