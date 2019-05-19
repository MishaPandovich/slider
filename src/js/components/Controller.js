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
        value: this.model.current,
        elem: thumbElem.eq(i)
      });
    }
  }

  onDocumentMouseMove({ elem, value }) {
    value += this.model.min;

    this.model.setValue({
      index: elem.index(),
      value,
      elem
    });
  }

  onInputChange({ index, value, elem }) {
    this.model.setValue({ index, value, elem });
  }

  changeValue({ index, value, elem }) {
    let min = this.model.min;

    this.view.showValue({ value, min, index, elem });
  }
}

export default Controller;