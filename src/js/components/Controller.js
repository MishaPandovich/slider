class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    this.view.init({
      min: this.model.min,
      max: this.model.max,
      step: this.model.step
    });

    for (let i = 0; i < this.view.thumbElem.length; i++) {
      this.model.setValue({
        value: this.model.current,
        elem: this.view.thumbElem.eq(i)
      });
    }
  }

  onDocumentMouseMove(elem, e) {
    if (this.view.position !== 'vertical') {
      let value = (e.clientX - this.view.shiftX - this.view.sliderCoords.left) / this.view.pixelsPerValue + this.model.min;
      this.model.setValue({
        value: value,
        elem: elem
      });
    }
    else {
      let value = (e.clientY - this.view.shiftY - this.view.sliderCoords.top) / this.view.pixelsPerValue + this.model.min;
      this.model.setValue({
        value: value,
        elem: elem
      });
    }
  }

  onInputChange(elem) {
    elem = $(elem);
    let thumbElem = (elem.hasClass('slider__input--first')) ? this.view.thumbElem.eq(0) : this.view.thumbElem.eq(1);

    this.model.setValue({
      value: +elem.val(),
      elem: thumbElem
    });
  }

  changeValue(options) {
    this.view.showValue({
      elem: options.elem,
      value: options.value,
      min: this.model.min
    });
  }
}

export default Controller;