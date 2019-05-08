import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для модели', function() {
  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

    const sliderOptions = {
      min: 9,
      max: 100,
      current: 20,
      step: 5,
      position: 'horizontal'
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
    expect(model.min).toBe(10);
    expect(model.max).toBe(100);
    expect(model.current).toBe(20);
    expect(model.step).toBe(5);
    expect(model.position).toBe('horizontal');
    expect(model.subscribers.any).toBeDefined();
  });

  it('getCoords', function() {
    model.getCoords(400, 20);
    expect(model.rightEdge).toBe(380);
    expect(model.pixelsPerValue).toBe(4.222222222222222);
  });

  it('moveTo', function() {
    expect(model.moveTo(-10)).toBe(10);
    expect(model.moveTo(110)).toBe(100);
  });

  it('setValue', function() {
    spyOn(view, 'viewValue').and.callThrough();
    model.setValue(22);
    expect(model.calcValue).toBe(20);
    expect(view.viewValue).toHaveBeenCalledWith(20, 10, 3.3333333333333335, 'horizontal');

    model.setValue(23, true);
    expect(model.calcValue).toBe(10);
    expect(view.viewValue).toHaveBeenCalledWith(10, 10, 3.3333333333333335, 'horizontal');
  });
});