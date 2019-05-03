import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для модели', function() {
  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

    const sliderOptions = {
      max: 100,
      value: 20,
      step: 5
    };
    const model = new Model(sliderOptions);
    const view = new View($('#slider1'));
    const controller = new Controller(model, view);

    model.subscribe('changeValue', controller.changeValue.bind(controller));
    view.subscribe('buttonClick', controller.onButtonClick.bind(controller));
    view.subscribe('documentMouseMove', controller.onDocumentMouseMove.bind(controller));

    controller.initPlugin();

    window.model = model;
    window.view = view;
    window.controller = controller;
  });

  it('constructor', function() {
    expect(model.max).toBe(100);
    expect(model.value).toBe(20);
    expect(model.step).toBe(5);
    expect(model.subscribers.any).toBeDefined();
  });

  it('getCoords', function() {
    model.getCoords(400, 20);
    expect(model.rightEdge).toBe(380);
    expect(model.pixelsPerValue).toBe(3.8);
  });

  it('moveTo', function() {
    expect(model.moveTo(-10)).toBe(0);
    expect(model.moveTo(310)).toBe(300);
  });

  it('setValue', function() {
    spyOn(view, 'viewValue').and.callThrough();
    model.setValue(22);
    expect(model.pixelsWithStep).toBe(20);
    expect(view.viewValue).toHaveBeenCalledWith(20, 3);

    model.setValue(23, true);
    expect(model.pixelsWithStep).toBe(10);
    expect(view.viewValue).toHaveBeenCalledWith(10, 3);
  });
});