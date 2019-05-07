class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    this.model.getCoords(this.view.elem.width(), this.view.thumbElem.width());
    this.model.setValue(this.model.current);
    this.view.initEventListeners();
  }

  onDocumentMouseMove(e) {
    this.model.setValue(e.clientX, true);
  }

  onButtonClick() {
    this.model.setValue(+this.view.change.val());
  }

  changeValue() {
    this.view.viewValue(this.model.calcValue, this.model.min, this.model.pixelsPerValue);
  }
}

export default Controller;