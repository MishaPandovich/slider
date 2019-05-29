class Controller {
  constructor({ model, view }) {
    this.model = model,
    this.view = view
  }

  initPlugin() {
    this.view.init({
      min: this.model.min,
      max: this.model.max,
      step: this.model.step
    });
  }

  setInitialValue(thumbElem) {
    for (let i = 0; i < thumbElem.length; i++) {
      this.model.setValue({
        index: i,
        value: this.model.current[i]
      });
    }
  }

  onDocumentMouseMove({ elem, value }) {
    value += this.model.min;

    this.model.setValue({
      index: elem.index(),
      value
    });
  }

  onInputChange({ index, value }) {
    this.model.setValue({ index, value });
  }

  changeValue({ index, value }) {
    this.view.showValue({ index, value, min: this.model.min });
  }
}

export default Controller;