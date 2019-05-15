class ViewThumb {
  createThumb(options) {
    options.modifier = options.modifier || 'first';
    let elem = options.elem,
        thumbElem = $('<div class="slider__thumb">'),
        input = $('<input type="number" class="slider__input">');

    thumbElem.addClass('slider__thumb--' + options.modifier);
    input.addClass('slider__input' + options.modifier);
    elem.append(thumbElem);
    elem.parent('.slider').append(input);
  }
}

export default ViewThumb;