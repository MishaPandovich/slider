class ViewPointer {
  createPointer(options) {
    let pointer = options.position !== 'vertical' ? '<div class="slider__pointer">' : '<div class="slider__pointer slider__pointer--left">';
    options.thumbElem.append($(pointer));
  }
}

export default ViewPointer;