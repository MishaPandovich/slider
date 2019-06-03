import Observer from './Observer';

class ViewOptions extends Observer {
  constructor({ slider, isVertical, hasInterval, hasPointer, hasScale }) {
    super();
    this.slider = slider;
    this.isVertical = isVertical;
    this.hasInterval = hasInterval;
    this.hasPointer = hasPointer;
    this.hasScale = hasScale;
  }

  setInputs({ min, max, step }) {
    let inputVertical = this.slider.find('.slider__is-vertical'),
        inputInterval = this.slider.find('.slider__has-interval'),
        inputPointer = this.slider.find('.slider__has-pointer'),
        inputScale = this.slider.find('.slider__has-scale'),
        inputMin = this.slider.find('.slider__min'),
        inputMax = this.slider.find('.slider__max'),
        inputStep = this.slider.find('.slider__step'),
        inputs = this.slider.find('input');
    this.inputsVal = this.slider.find('.slider__value');

    inputs.off();

    inputVertical.prop('checked', this.isVertical);
    inputInterval.prop('checked', this.hasInterval);
    inputPointer.prop('checked', this.hasPointer);
    inputScale.prop('checked', this.hasScale);
    inputMin.val(min);
    inputMax.val(max);
    inputStep.val(step);
    this.inputsVal.attr({ min, max, step });

    if (!this.hasInterval) {
      this.inputsVal.eq(1).parent().hide();
    }
    else {
      this.inputsVal.eq(1).parent().show();
      this.inputsVal.eq(0).attr('max', this.inputsVal.eq(1).val());
      this.inputsVal.eq(1).attr('min', this.inputsVal.eq(0).val());
    }

    inputVertical.on('change', this.updateInputs.bind(this, 'isVertical'));
    inputInterval.on('change', this.updateInputs.bind(this, 'hasInterval'));
    inputPointer.on('change', this.updateInputs.bind(this, 'hasPointer'));
    inputScale.on('change', this.updateInputs.bind(this, 'hasScale'));
    inputMin.on('focusout', this.updateInputs.bind(this, 'min'));
    inputMax.on('focusout', this.updateInputs.bind(this, 'max'));
    inputStep.on('focusout', this.updateInputs.bind(this, 'step'));
    this.inputsVal.on('focusout', this.onInputChange.bind(this));
    this.inputsVal.on('focusout', this.updateInputs.bind(this, 'current'));
  }

  updateThumbs(index) {
    this.publish('update', {
      prop: 'current',
      input: this.inputsVal[index]
    });
  }

  updateInputs(prop, e) {
    this.publish('update', {
      prop,
      input: e.target
    });
  }

  showValue({ index, value }) {
    this.inputsVal.eq(index).val(value);
  }

  onInputChange(e) {
    let elem = $(e.target),
        index = this.inputsVal.index(elem),
        value = +elem.val();

    this.publish('onInputChange', { index, value });
  }
}

export default ViewOptions;