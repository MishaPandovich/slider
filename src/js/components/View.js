import ViewScale from './ViewScale';
import Observer from './Observer';

class View extends Observer {
  constructor(options) {
    super();
    this.slider = $(options.slider);
    this.elem = this.slider.find('.slider__runner');
    this.position = options.position;
    this.hasScale = options.hasScale;
    this.viewThumb = options.viewThumb;
  }

  init({ min, max, step }) {
    this.showPosition();

    let thumbElem = this.viewThumb.addThumbs();

    this.setInputs({ min, max, step, thumbElem });
    this.getCoords({ min, max, thumbElem });

    if (this.hasScale) {
      let options = {
        min,
        max,
        step,
        position: this.position,
        pixelsPerValue: this.pixelsPerValue,
        elem: this.elem
      };
      this.viewScale = new ViewScale(options);
    }
  }

  showPosition() {
    if (this.position === 'vertical') {
      this.elem.addClass('slider__runner--vertical');
    }
  }

  setInputs({ min, max, step, thumbElem }) {
    this.input = this.slider.find('.slider__input');
    this.input.attr({
      min,
      max,
      step
    });

    this.input.on('focusout', (e) => { this.onInputChange({
        elem: $(e.target),
        thumbElem
      })
    });
  }

  getCoords({ min, max, thumbElem }) {
    let rightEdge = this.position !== 'vertical'
                  ? this.elem.width() - thumbElem.width()
                  : this.elem.height() - thumbElem.height();
    this.pixelsPerValue = rightEdge / (max - min);

    this.publish('setInitialValue', thumbElem);
  }

  showValue({ value, min, index, elem }) {
    let css = this.position !== 'vertical' ? 'left' : 'top',
        cssValue = (value - min) * this.pixelsPerValue;

    elem.css(css, cssValue + 'px');
    this.input.eq(index).val(value);

    this.publish('showValue', { elem, value });
  }

  onInputChange({ elem, thumbElem }) {
    let index = this.input.index(elem),
        value = +elem.val();

    this.publish('onInputChange', {
      index,
      value,
      elem: thumbElem.eq(index)
    });
  }

  onElemMouseDown(e) {
    let elem = $(e.target).closest('.slider__thumb'),
        thumbCoords = elem[0].getBoundingClientRect(),
        shiftX = e.clientX - thumbCoords.left,
        shiftY = e.clientY - thumbCoords.top,
        sliderCoords = elem[0].parentElement.getBoundingClientRect();

    $(document).on('mousemove', this.onDocumentMouseMove.bind(this, { elem, shiftX, shiftY, sliderCoords }));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
  }

  onDocumentMouseMove({ elem, shiftX, shiftY, sliderCoords }, e) {
    let value = this.position !== 'vertical'
              ? (e.clientX - shiftX - sliderCoords.left) / this.pixelsPerValue
              : (e.clientY - shiftY - sliderCoords.top) / this.pixelsPerValue;

    this.publish('onDocumentMouseMove', { elem, value });
  }

  onDocumentMouseUp() {
    $(document).off('mousemove');
    $(document).off('mouseup');
  }
}

export default View;