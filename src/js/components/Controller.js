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
      this.view.isVertical();
      this.model.getCoords(this.view.elem.height(), this.view.thumbElem.height());
    }
    this.model.setValue(this.model.current);
    this.view.initEventListeners();
  }

  onDocumentMouseMove(e) {
    if (this.model.position !== 'vertical') {
      this.model.setValue(e.clientX, true);
    }
    else {
      this.model.setValue(e.clientY, true);
    }
  }

  onButtonClick() {
    this.model.setValue(+this.view.change.val());
  }

  changeValue() {
    this.view.viewValue(this.model.calcValue, this.model.min, this.model.pixelsPerValue, this.model.position);
  }
}

export default Controller;