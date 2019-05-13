class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    if (this.model.position !== 'vertical') {
      this.model.getCoords(this.view.elem.width(), this.view.thumbElem.width());
    }
    else {
      this.view.showVertical();
      this.model.getCoords(this.view.elem.height(), this.view.thumbElem.height());
    }

    if (this.model.hasInterval) {
      this.view.addSecondThumb();
    }

    if (this.model.hasPointer) {
      this.view.addPointer(this.model.position);
    }

    this.view.setInputsAttr(this.model.min, this.model.max, this.model.step);

    for (let i = 0; i < this.view.thumbElem.length; i++) {
      this.model.setValue(this.model.current, this.view.thumbElem.eq(i));
    }

    this.view.initEventListeners();
  }

  onDocumentMouseMove(elem, e) {
    if (this.model.position !== 'vertical') {
      let value = (e.clientX - this.view.shiftX - this.view.sliderCoords.left) / this.model.pixelsPerValue + this.model.min;
      this.model.setValue(value, elem);
    }
    else {
      let value = (e.clientY - this.view.shiftY - this.view.sliderCoords.top) / this.model.pixelsPerValue + this.model.min;
      this.model.setValue(value, elem);
    }
  }

  onInputChange(elem) {
    elem = $(elem);
    let thumbElem = (elem.hasClass('slider__change--first')) ? this.view.thumbElem.eq(0) : this.view.thumbElem.eq(1);

    this.model.setValue(+elem.val(), thumbElem);
  }

  changeValue(elem, res) {
    this.view.showValue(elem, res, this.model.min, this.model.pixelsPerValue, this.model.position);
  }
}

export default Controller;