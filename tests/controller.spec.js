import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для контроллера', function() {
  let model = new Model({
    min: 9,
    max: 200,
    current: 19,
    step: 10
  });

  let view = new View({
    slider: $('#slider1'),
    position: 'horizontal',
    hasScale: false
  });

  let controller, thumbElem;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input type="number" class="slider__input"></div>');

    thumbElem = $('.slider__thumb');

    controller = new Controller({ model, view });
  });

  it('constructor', function() {
    expect(controller.model).toBe(model);
    expect(controller.view).toBe(view);
  });

  it('initPlugin', function() {
    spyOn(controller.view, 'init');
    controller.initPlugin();
    expect(controller.view.init).toHaveBeenCalledWith({
      min: controller.model.min,
      max: controller.model.max,
      step: controller.model.step
    });
  });

  it('setInitialValue', function() {
    spyOn(controller.model, 'setValue');
    controller.setInitialValue(thumbElem);
    expect(controller.model.setValue).toHaveBeenCalledWith({
      index: 0,
      value: controller.model.current
    });
  });

  it('onDocumentMouseMove', function() {
    spyOn(controller.model, 'setValue');
    controller.onDocumentMouseMove({ elem: thumbElem, value: 30 });
    expect(controller.model.setValue).toHaveBeenCalledWith({
      index: 0,
      value: 40
    });
  });

  it('onInputChange', function() {
    spyOn(controller.model, 'setValue');
    let index = 'index',
        value = 'value';
    controller.onInputChange({ index, value });
    expect(controller.model.setValue).toHaveBeenCalledWith({ index, value });
  });

  it('changeValue', function() {
    spyOn(controller.view, 'changeInputsAttr');
    spyOn(controller.view, 'showValue');
    let index = 'index',
        value = 'value';
    controller.changeValue({ index, value });
    expect(controller.view.changeInputsAttr).toHaveBeenCalledWith({ index, value });
    expect(controller.view.showValue).toHaveBeenCalledWith({ index, value, min: controller.model.min });
  });
});