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

    if (this.model.hasPointer) {
      this.view.showPointer(this.model.position);
    }

    this.model.setValue(this.model.current);
    this.view.initEventListeners();
  }

  onDocumentMouseMove(e) {
    if (this.model.position !== 'vertical') {
      let value = (e.clientX - this.view.shiftX - this.view.sliderCoords.left) / this.model.pixelsPerValue + this.model.min;
      this.model.setValue(value);
    }
    else {
      let value = (e.clientY - this.view.shiftY - this.view.sliderCoords.top) / this.model.pixelsPerValue + this.model.min;
      this.model.setValue(value);
    }
  }

  onInputChange() {
    this.model.setValue(+this.view.change.val());
  }

  changeValue() {
    this.view.showValue(this.model.calcValue, this.model.min, this.model.pixelsPerValue, this.model.position);
  }
}

export default Controller;