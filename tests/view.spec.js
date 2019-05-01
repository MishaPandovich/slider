import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для вью', function() {
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
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.thumbElem).toHaveClass('slider__thumb');
    expect(view.change).toHaveClass('slider__change');
    expect(view.button).toHaveClass('slider__button');
    expect(view.subscribers.any).toBeDefined();
  });

  it('initEventListeners', function() {
    view.initEventListeners();
    view.elem.trigger('dragstart');
    view.elem.mousedown();
    view.button.click();
    expect($._data(view.elem[0]).events.dragstart).toBeDefined();
    expect($._data(view.elem[0]).events.mousedown).toBeDefined();
    expect($._data(view.button[0]).events.click).toBeDefined();
  });

  it('viewValue', function() {
    view.viewValue(60, 3);
    expect(view.thumbElem.css('left')).toBe('180px');
    expect(view.change.val()).toBe('60');
  });

  it('startDrag', function() {
    view.startDrag(108, 18);
    expect(view.shiftX).toBe(35);
    expect(view.shiftY).toBe(15);
  });

  it('preventDefault', function() {
    expect(view.preventDefault()).toBeFalsy();
  });

  it('onElemMouseDown', function() {
    view.onElemMouseDown({ clientX: 120, clientY: 20 });
    expect(view.shiftX).toBe(47);
    expect(view.shiftY).toBe(17);
  });

  it('onDocumentMouseUp', function() {
    view.onDocumentMouseUp();
    expect($._data(document).events).not.toBeDefined();
  });
});