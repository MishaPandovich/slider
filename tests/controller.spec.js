import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для контроллера', function() {
  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

    const sliderOptions = {
      min: 9,
      max: 100,
      current: 20,
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

    spyOn(model, 'getCoords').and.callThrough();
    spyOn(model, 'setValue').and.callThrough();
    spyOn(model, 'moveTo').and.callThrough();
    spyOn(view, 'initEventListeners');
    spyOn(view, 'viewValue').and.callThrough();
  });

  it('constructor', function() {
    expect(typeof controller.model).toBe('object');
    expect(typeof controller.view).toBe('object');
  });

  it('initPlugin', function() {
    view.elem.width(500);
    view.thumbElem.width(30);
    model.current = 46;
    controller.initPlugin();
    expect(model.getCoords).toHaveBeenCalledWith(500, 30);
    expect(model.setValue).toHaveBeenCalledWith(46);
    expect(view.initEventListeners).toHaveBeenCalled();
    expect(model.rightEdge).toBe(470);
    expect(model.pixelsPerValue).toBe(5.222222222222222);
    expect(model.calcValue).toBe(45);
  });

  it('onDocumentMouseMove', function() {
    controller.onDocumentMouseMove({ clientX: 350 });
    expect(model.setValue).toHaveBeenCalledWith(350, true);
    expect(model.calcValue).toBe(100);

    controller.onDocumentMouseMove({ clientX: 252 });
    expect(model.setValue).toHaveBeenCalledWith(252, true);
    expect(model.calcValue).toBe(75);
  });

  it('onButtonClick', function() {
    view.change.val('52');
    controller.onButtonClick();
    expect(model.setValue).toHaveBeenCalledWith(52);
    expect(model.calcValue).toBe(50);
  });

  it('changeValue', function() {
    model.calcValue = 95;
    model.min = 10;
    model.pixelsPerValue = 2.2;
    controller.changeValue();
    expect(view.viewValue).toHaveBeenCalledWith(95, 10, 2.2);
    expect(view.thumbElem.css('left')).toBe('187px');
    expect(view.change.val()).toBe('95');
  });
});