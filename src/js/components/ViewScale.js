class ViewScale {
  constructor({ min, max, step, isVertical, pixelsPerValue, elem }) {
    this.createScale({ min, max, step, isVertical, pixelsPerValue, elem });
  }

  createScale({ min, max, step, isVertical, pixelsPerValue, elem }) {
    let value = min,
        cssValue = 0,
        count = (max - min) / step;

    while (count > 20) {
      count /= 2;
      step *= 2;
    }

    if (!isVertical) {
      var ul = $('<ul class="slider__scale">'),
          css = 'left';
    }
    else {
      var ul = $('<ul class="slider__scale slider__scale--vertical">'),
          css = 'top';
    }

    for (let i = 0; i <= count; i++) {
      cssValue = (value - min) * pixelsPerValue + 'px';
      let li = $('<li class="slider__scale-item" style="' + css + ': ' + cssValue + '">' + value + '</li>');
      ul.append(li);
      value += step;
    }

    elem.append(ul);
  }
}

export default ViewScale;