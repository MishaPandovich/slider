class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    this.model.getCoords(this.view.elem.width(), this.view.thumbElem.width());
    this.model.setValue(this.model.value);
    this.initEventListeners();
  }

  initEventListeners() {
    this.view.elem.on('dragstart', this.preventDefault);
    this.view.elem.on('mousedown', this.onElemMouseDown.bind(this));
  }

  preventDefault() {
    return false;
  }

  startDrag(startClientX, startClientY) {
    this.view.thumbCoords = this.view.thumbElem[0].getBoundingClientRect();
    this.view.shiftX = startClientX - this.view.thumbCoords.left;
    this.view.shiftY = startClientY - this.view.thumbCoords.top;

    $(document).on('mousemove', this.onDocumentMouseMove.bind(this));
    $(document).on('mouseup', this.onDocumentMouseUp.bind(this));
  }

  onElemMouseDown(e) {
    this.startDrag(e.clientX, e.clientY);
    return false;
  }

  onDocumentMouseMove(e) {
    let moveTo = this.model.moveTo(e.clientX);
    this.model.setValue(moveTo, true);
    this.view.viewValue(this.model.pixelsWithStep, this.model.pixelsPerValue);
  }

  onDocumentMouseUp() {
    $(document).off('mousemove');
    $(document).off('mouseup');
  }
}

export default Controller;