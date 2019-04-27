class View {
  constructor(slider) {
    this.elem = slider.find('.slider__runner'),
    this.thumbElem = slider.find('.slider__thumb'),
    this.change = slider.find('.slider__change'),
    this.button = slider.find('.slider__button')
  }

  viewValue(value, pixelsPerValue) {
    this.thumbElem.css('left', value * pixelsPerValue + 'px');
    this.change.val(value);
  }
}

export default View;