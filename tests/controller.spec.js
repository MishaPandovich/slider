import './beforeEach.js';

describe('Тесты для контроллера', function() {
  beforeEach(function() {
    spyOn(model, 'getCoords').and.callThrough();
    spyOn(model, 'setValue').and.callThrough();
    spyOn(model, 'moveTo').and.callThrough();
    spyOn(view, 'initEventListeners');
    spyOn(view, 'addSecondThumb').and.callThrough();
    spyOn(view, 'setInputsAttr').and.callThrough();
    spyOn(view, 'showVertical').and.callThrough();
    spyOn(view, 'addPointer').and.callThrough();
    spyOn(view, 'showValue').and.callThrough();
  });

  it('constructor', function() {
    expect(typeof controller.model).toBe('object');
    expect(typeof controller.view).toBe('object');
  });

  it('initPlugin', function() {
    view.elem.width(500);
    view.thumbElem.width(30);
    model.position = 'gorizontal';
    model.hasPointer = true;
    model.hasInterval = true;
    controller.initPlugin();
    expect(model.getCoords).toHaveBeenCalledWith(view.elem.width(), view.thumbElem.width());

    view.elem.height(600);
    view.thumbElem.height(40);
    model.position = 'vertical';
    controller.initPlugin();
    expect(model.getCoords).toHaveBeenCalledWith(view.elem.height(), view.thumbElem.height());

    expect(view.showVertical).toHaveBeenCalled();
    expect(view.addSecondThumb).toHaveBeenCalled();
    expect(view.addPointer).toHaveBeenCalledWith(model.position);
    expect(view.setInputsAttr).toHaveBeenCalledWith(model.min, model.max, model.step);
    expect(model.setValue).toHaveBeenCalledWith(model.current, view.thumbElem.eq(0));
    expect(model.setValue).toHaveBeenCalledWith(model.current, view.thumbElem.eq(1));
    expect(view.initEventListeners).toHaveBeenCalled();
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
    let elem = view.thumbElem.eq(0);
    view.onElemMouseDown(e);

    let value = setValue(e.clientX);
    controller.onDocumentMouseMove(elem, e);
    expect(model.setValue).toHaveBeenCalledWith(value, elem);

    model.position = 'vertical';
    value = setValue(e.clientY);
    controller.onDocumentMouseMove(elem, e);
    expect(model.setValue).toHaveBeenCalledWith(value, elem);
  });

  it('onInputChange', function() {
    let elem = view.change.eq(0);
    elem.val('40');
    controller.onInputChange(elem);
    expect(model.setValue).toHaveBeenCalledWith(40, view.thumbElem.eq(0));

    view.addSecondThumb();
    elem = view.change.eq(1);
    elem.val('50');
    controller.onInputChange(elem);
    expect(model.setValue).toHaveBeenCalledWith(50, view.thumbElem.eq(1));
  });

  it('changeValue', function() {
    let elem = view.thumbElem.eq(0);
    let change = view.change.eq(0);
    let res = 95;
    model.min = 10;
    model.pixelsPerValue = 2.2;
    model.position = 'horizontal';
    controller.changeValue(elem, res);
    expect(view.showValue).toHaveBeenCalledWith(elem, res, model.min, model.pixelsPerValue, model.position);
    expect(elem.css('left')).toBe('187px');
    expect(change.val()).toBe('95');
  });
});