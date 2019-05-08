import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

describe('Тесты для вью', function() {
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
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.thumbElem).toHaveClass('slider__thumb');
    expect(view.change).toHaveClass('slider__change');
    expect(view.button).toHaveClass('slider__button');
    expect(view.subscribers.any).toBeDefined();
  });

  it('initEventListeners', function() {
    spyOn(view, 'onElemMouseDown');
    spyOn(view, 'buttonClick');
    view.initEventListeners();
    expect($._data(view.elem[0]).events.mousedown).toBeDefined();
    expect($._data(view.button[0]).events.click).toBeDefined();

    view.elem.mousedown();
    expect(view.onElemMouseDown).toHaveBeenCalled();

    view.button.click();
    expect(view.buttonClick).toHaveBeenCalled();
  });

  it('isVertical', function() {
    view.isVertical();
    expect(view.elem).toHaveClass('slider__runner--vertical');
  });

  it('viewValue', function() {
    view.viewValue(60, 10, 3, 'horizontal');
    expect(view.thumbElem.css('left')).toBe('150px');
    expect(view.change.val()).toBe('60');

    view.viewValue(60, 10, 3, 'vertical');
    expect(view.thumbElem.css('top')).toBe('150px');
    expect(view.change.val()).toBe('60');
  });

  it('onElemMouseDown', function() {
    spyOn(view, 'documentMouseMove').and.callThrough();
    spyOn(view, 'onDocumentMouseUp').and.callThrough();
    let fn = view.onElemMouseDown();
    expect(fn).toBeFalsy();

    $(document).mousemove();
    expect(view.documentMouseMove).toHaveBeenCalled();
    expect($._data(document).events.mousemove).toBeDefined();
    expect($._data(document).events.mouseup).toBeDefined();

    $(document).mouseup();
    expect(view.onDocumentMouseUp).toHaveBeenCalled();
    expect($._data(document).events).not.toBeDefined();
  });

  it('buttonClick', function() {
    spyOn(view, 'publish');
    view.buttonClick();
    expect(view.publish).toHaveBeenCalledWith('buttonClick');
  });

  it('documentMouseMove', function() {
    spyOn(view, 'publish');
    view.documentMouseMove({});
    expect(view.publish).toHaveBeenCalledWith('documentMouseMove', {});
  });

  it('onDocumentMouseUp', function() {
    view.onDocumentMouseUp();
    expect($._data(document).events).not.toBeDefined();
  });
});