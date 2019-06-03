import Observer from './Observer';

class ViewScale extends Observer {
  constructor({ elem, isVertical, hasInterval }) {
    super();
    this.elem = elem;
    this.isVertical = isVertical;
    this.hasInterval = hasInterval;
  }

  createScale({ min, max, step, pixelsPerValue, thumbElem }) {
    let ul,
        css,
        value = min,
        cssValue = 0,
        count = (max - min) / step;

    while (count > 20) {
      count /= 2;
      step *= 2;
    }

    if (!this.isVertical) {
      ul = $('<ul class="slider__scale">');
      css = 'left';
    }
    else {
      ul = $('<ul class="slider__scale slider__scale--vertical">');
      css = 'top';
    }

    for (let i = 0; i <= count; i++) {
      cssValue = (value - min) * pixelsPerValue + 'px';
      let li = $('<li class="slider__scale-item" style="' + css + ': ' + cssValue + '">' + value + '</li>');
      ul.append(li);
      value += step;

      li.on('click', this.onClickScale.bind(this, thumbElem));
    }

    this.elem.append(ul);
  }

  onClickScale(thumbElem, e) {
    let index,
        css = !this.isVertical ? 'left' : 'top',
        value = $(e.target).text(),
        cssValue = $(e.target).css(css);

    if (this.hasInterval) {
      if (parseInt(cssValue) <= parseInt(thumbElem.eq(0).css(css))) {
        index = 0;
      }
      else if (parseInt(cssValue) >= parseInt(thumbElem.eq(1).css(css))) {
        index = 1;
      }
      else {
        let dif1 = parseInt(cssValue) - parseInt(thumbElem.eq(0).css(css)),
            dif2 = parseInt(thumbElem.eq(1).css(css)) - parseInt(cssValue);

        if (dif1 < dif2) {
          index = 0;
        }
        else {
          index = 1;
        }
      }
    }
    else {
      index = 0;
    }

    this.publish('onClickScale', { index, value, css, cssValue })
  }
}

export default ViewScale;