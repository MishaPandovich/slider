import './beforeEach.js';

describe('Тесты для контроллера', function() {
  beforeEach(function() {
    spyOn(model, 'getCoords').and.callThrough();
    spyOn(model, 'setValue').and.callThrough();
    spyOn(model, 'moveTo').and.callThrough();
    spyOn(view, 'initEventListeners');
    spyOn(view, 'showVertical').and.callThrough();
    spyOn(view, 'showPointer').and.callThrough();
    spyOn(view, 'showValue').and.callThrough();
  });

  it('constructor', function() {
    expect(typeof controller.model).toBe('object');
    expect(typeof controller.view).toBe('object');
  });

  it('initPlugin', function() {
    view.elem.height(500);
    view.thumbElem.height(30);
    model.current = 46;
    model.position = 'vertical';
    model.hasPointer = true;
    controller.initPlugin();
    expect(view.showVertical).toHaveBeenCalled();
    expect(view.showPointer).toHaveBeenCalledWith(model.position);
    expect(model.getCoords).toHaveBeenCalledWith(view.elem.height(), view.thumbElem.height());
    expect(model.setValue).toHaveBeenCalledWith(model.current);
    expect(view.initEventListeners).toHaveBeenCalled();

    expect(view.elem).toHaveClass('slider__runner--vertical');
    expect(model.rightEdge).toBe(470);
    expect(model.pixelsPerValue).toBe(5.222222222222222);
    expect(model.calcValue).toBe(45);
  });

  it('onDocumentMouseMove', function() {
    let setValue = (client) => {
      if (model.position !== 'vertical') {
        return (client - view.shiftX - view.sliderCoords.left) / model.pixelsPerValue + model.min;
      }
      else {
        return (client - view.shiftY - view.sliderCoords.top) / model.pixelsPerValue + model.min;
      }
    }

    let e = { clientX: 350, clientY: 50, target: view.thumbElem[0] };
    view.onElemMouseDown(e);

    let value = setValue(e.clientX);
    controller.onDocumentMouseMove(e);
    expect(model.setValue).toHaveBeenCalledWith(value);

    model.position = 'vertical';
    value = setValue(e.clientY);
    controller.onDocumentMouseMove(e);
    expect(model.setValue).toHaveBeenCalledWith(value);
  });

  it('onInputChange', function() {
    view.change.val('52');
    controller.onInputChange();
    expect(model.setValue).toHaveBeenCalledWith(52);
  });

  it('changeValue', function() {
    model.calcValue = 95;
    model.min = 10;
    model.pixelsPerValue = 2.2;
    model.position = 'horizontal';
    controller.changeValue();
    expect(view.showValue).toHaveBeenCalledWith(model.calcValue, model.min, model.pixelsPerValue, model.position);
    expect(view.thumbElem.css('left')).toBe('187px');
    expect(view.change.val()).toBe('95');
  });
});