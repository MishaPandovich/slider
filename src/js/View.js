import ViewScale from './ViewScale';
import Observer from './Observer';

class View extends Observer {
  constructor(options) {
    super();
    this.slider = options.slider;
    this.elem = this.slider.find('.slider__runner');
    this.isVertical = options.isVertical;
    this.viewThumb = options.viewThumb;
    this.viewOptions = options.viewOptions;
    if (options.hasScale) {
      this.viewScale = options.viewScale;
    }
  }

  init({ min, max, step }) {
    this.showOrientation();
    this.viewOptions.setInputs({ min, max, step });

    this.viewThumb.addThumbs();
    let thumbElem = this.viewThumb.getThumbElem();

    this.getCoords({ min, max, thumbElem });
    this.publish('setInitialValue', thumbElem);

    if (this.viewScale) {
      this.viewScale.createScale({
        min,
        max,
        step,
        pixelsPerValue: this.pixelsPerValue,
        elem: this.elem,
        thumbElem
      });
    }
    else {
      if (!this.isVertical) {
        this.elem.css('marginTop', '12.8px');
      }
    }
  }

  showOrientation() {
    if (this.isVertical) {
      this.elem.addClass('slider__runner--vertical');
    }
    else {
      this.elem.removeClass('slider__runner--vertical');
    }
  }

  getCoords({ min, max, thumbElem }) {
    let rightEdge = !this.isVertical
                  ? this.elem.width() - thumbElem.width()
                  : this.elem.height() - thumbElem.height();
    this.pixelsPerValue = rightEdge / (max - min);
  }

  showValue({ index, value, min }) {
    let css = !this.isVertical ? 'left' : 'top',
        cssValue = (value - min) * this.pixelsPerValue + 'px';

    this.publish('showValue', { index, value, css, cssValue });
  }

  onInputChange({ index, value }) {
    this.publish('onInputChange', { index, value });
  }

  onElemMouseDown(e) {
    let elem = $(e.target).closest('.slider__thumb'),
        thumbCoords = elem[0].getBoundingClientRect(),
        shiftX = e.clientX - thumbCoords.left,
        shiftY = e.clientY - thumbCoords.top,
        sliderCoords = elem[0].parentElement.getBoundingClientRect();

    $(document).on('mousemove', this.onDocumentMouseMove.bind(this, { elem, shiftX, shiftY, sliderCoords }));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this, elem));
  }

  onDocumentMouseMove({ elem, shiftX, shiftY, sliderCoords }, e) {
    let value = !this.isVertical
              ? (e.clientX - shiftX - sliderCoords.left) / this.pixelsPerValue
              : (e.clientY - shiftY - sliderCoords.top) / this.pixelsPerValue;

    this.publish('onDocumentMouseMove', { elem, value });
  }

  onDocumentMouseUp(elem) {
    $(document).off('mousemove');
    $(document).off('mouseup');

    this.publish('updateThumbs', elem.index());
  }

  onClickScale({ index, value, css, cssValue }) {
    this.publish('showValue', { index, value, css, cssValue });
    this.publish('updateThumbs', index);
  }
}

export default View;