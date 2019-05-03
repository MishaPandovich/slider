import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для контроллера', function() {
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

    spyOn(model, 'getCoords').and.callThrough();
    spyOn(model, 'setValue').and.callThrough();
    spyOn(model, 'moveTo').and.callThrough();
    spyOn(view, 'initEventListeners');
    spyOn(view, 'viewValue').and.callThrough();
    spyOn(view, 'startDrag').and.callThrough();
  });

  it('constructor', function() {
    expect(typeof controller.model).toBe('object');
    expect(typeof controller.view).toBe('object');
  });

  it('initPlugin', function() {
    view.elem.width(500);
    view.thumbElem.width(30);
    model.value = 46;
    controller.initPlugin();
    expect(model.getCoords).toHaveBeenCalledWith(500, 30);
    expect(model.setValue).toHaveBeenCalledWith(46);
    expect(view.initEventListeners).toHaveBeenCalled();
    expect(model.rightEdge).toBe(470);
    expect(model.pixelsPerValue).toBe(4.7);
    expect(model.pixelsWithStep).toBe(45);
  });

  it('onDocumentMouseMove', function() {
    controller.onDocumentMouseMove({ clientX: 350 });
    expect(model.moveTo).toHaveBeenCalledWith(350);
    expect(model.setValue).toHaveBeenCalledWith(300, true);
    expect(model.pixelsWithStep).toBe(100);

    controller.onDocumentMouseMove({ clientX: 252 });
    expect(model.moveTo).toHaveBeenCalledWith(252);
    expect(model.setValue).toHaveBeenCalledWith(252, true);
    expect(model.pixelsWithStep).toBe(85);
  });

  it('onButtonClick', function() {
    view.change.val('52');
    controller.onButtonClick();
    expect(model.moveTo).toHaveBeenCalledWith(52);
    expect(model.setValue).toHaveBeenCalledWith(52);
    expect(model.pixelsWithStep).toBe(50);
  });

  it('changeValue', function() {
    model.pixelsWithStep = 105;
    model.pixelsPerValue = 2.2;
    controller.changeValue();
    expect(view.viewValue).toHaveBeenCalledWith(105, 2.2);
    expect(view.thumbElem.css('left')).toBe('231px');
    expect(view.change.val()).toBe('105');
  });
});