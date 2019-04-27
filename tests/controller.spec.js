import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

const sliderOptions = {
  max: 100,
  value: 20,
  step: 5
};

const model = new Model(sliderOptions);
const view = new View($('#slider1'));
const controller = new Controller(model, view);

describe('Тесты для контроллера', function() {
  beforeEach(function() {
    view.elem.width(310);
    view.thumbElem.width(10);
    controller.initPlugin();
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
    expect(model.rightEdge).toBe(470);
    expect(model.pixelsPerValue).toBe(4.7);
    expect(model.pixelsWithStep).toBe(45);
  });

  it('initEventListeners', function() {
    controller.initEventListeners();
    view.elem.trigger('dragstart');
    view.elem.mousedown();
    expect($._data(view.elem[0]).events.dragstart).toBeDefined();
    expect($._data(view.elem[0]).events.mousedown).toBeDefined();
  });

  it('preventDefault', function() {
    expect(controller.preventDefault()).toBeFalsy();
  });

  it('startDrag', function() {
    controller.startDrag(108, 18);
    expect(view.shiftX).toBe(108);
    expect(view.shiftY).toBe(18);
  });

  it('onElemMouseDown', function() {
    controller.onElemMouseDown({ clientX: 120, clientY: 20 });
    expect(view.shiftX).toBe(120);
    expect(view.shiftY).toBe(20);
  });

  it('onDocumentMouseMove', function() {
    controller.onDocumentMouseMove({ clientX: 350 });
    expect(model.pixelsWithStep).toBe(100);
    expect(view.thumbElem.css('left')).toBe('300px');
    expect(view.change.val()).toBe('100');

    controller.onDocumentMouseMove({ clientX: 252 });
    expect(model.pixelsWithStep).toBe(85);
    expect(view.thumbElem.css('left')).toBe('255px');
    expect(view.change.val()).toBe('85');
  });

  it('onDocumentMouseUp', function() {
    controller.onDocumentMouseUp();
    expect($._data(document).events).not.toBeDefined();
  });
});