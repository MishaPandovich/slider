class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    this.model.getCoords(this.view.elem.width(), this.view.thumbElem.width());
    this.model.setValue(this.model.value);
    this.view.initEventListeners();
  }

  onDocumentMouseMove(e) {
    let moveTo = this.model.moveTo(e.clientX);
    this.model.setValue(moveTo, true);
  }

  onButtonClick() {
    let moveTo = this.model.moveTo(+this.view.change.val());
    this.model.setValue(moveTo);
  }

  changeValue() {
    this.view.viewValue(this.model.pixelsWithStep, this.model.pixelsPerValue);
  }
}

export default Controller;