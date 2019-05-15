class ViewScale {
  createScale(options) {
    let min = options.min,
        max = options.max,
        step = options.step,
        value = min,
        cssValue = 0,
        count = (max - min) / step;

    while (count > 20) {
      count /= 2;
      step *= 2;
    }

    if (options.position !== 'vertical') {
      var ul = $('<ul class="slider__scale">');
      var css = 'left';
    }
    else {
      var ul = $('<ul class="slider__scale slider__scale--vertical">');
      var css = 'top';
    }

    for (let i = 0; i <= count; i++) {
      cssValue = (value - min) * options.pixelsPerValue + 'px';
      let li = $('<li class="slider__scale-item" style="' + css + ': ' + cssValue + '">' + value + '</li>');
      ul.append(li);
      value += step;
    }

    options.elem.append(ul);
  }
}

export default ViewScale;