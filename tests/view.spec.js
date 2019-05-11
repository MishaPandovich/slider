import './beforeEach.js';

describe('Тесты для вью', function() {
  it('constructor', function() {
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.thumbElem).toHaveClass('slider__thumb');
    expect(view.change).toHaveClass('slider__change');
    expect(view.subscribers.any).toBeDefined();
  });

  it('initEventListeners', function() {
    spyOn(view, 'onElemMouseDown');
    spyOn(view, 'inputChange');
    view.initEventListeners();
    expect($._data(view.thumbElem[0]).events.mousedown).toBeDefined();
    expect($._data(view.change[0]).events.focusout).toBeDefined();

    view.thumbElem.mousedown();
    expect(view.onElemMouseDown).toHaveBeenCalled();

    view.change.focusout();
    expect(view.inputChange).toHaveBeenCalled();
  });

  it('showVertical', function() {
    view.showVertical();
    expect(view.elem).toHaveClass('slider__runner--vertical');
  });

  it('showPointer', function() {
    view.showPointer('horizontal');
    expect(view.thumbElem.children()).toHaveClass('slider__pointer');

    view.showPointer('vertical');
    expect(view.thumbElem.children()).toHaveClass('slider__pointer slider__pointer--left');
  });

  it('showValue', function() {
    view.showPointer('horizontal');
    view.showValue(60, 10, 3, 'horizontal');
    expect(view.thumbElem.css('left')).toBe('150px');
    expect(view.change).toHaveValue('60');
    expect(view.thumbElem.find('.slider__pointer')).toHaveHtml('60');

    view.showPointer('vertical');
    view.showValue(70, 10, 3, 'vertical');
    expect(view.thumbElem.css('top')).toBe('180px');
    expect(view.change).toHaveValue('70');
    expect(view.thumbElem.find('.slider__pointer--left')).toHaveHtml('70');
  });

  it('onElemMouseDown', function() {
    spyOn(view, 'documentMouseMove').and.callThrough();
    spyOn(view, 'onDocumentMouseUp').and.callThrough();
    let e = { clientX: 350, clientY: 50, target: view.thumbElem[0] };
    let fn = view.onElemMouseDown(e);
    expect(fn).toBeFalsy();
    expect(view.shiftX).toBe(e.clientX - e.target.getBoundingClientRect().left);
    expect(view.shiftY).toBe(e.clientY - e.target.getBoundingClientRect().top);
    expect(view.sliderCoords).toEqual(e.target.parentElement.getBoundingClientRect());

    $(document).mousemove();
    expect(view.documentMouseMove).toHaveBeenCalled();
    expect($._data(document).events.mousemove).toBeDefined();
    expect($._data(document).events.mouseup).toBeDefined();

    $(document).mouseup();
    expect(view.onDocumentMouseUp).toHaveBeenCalled();
    expect($._data(document).events).not.toBeDefined();
  });

  it('inputChange', function() {
    spyOn(view, 'publish');
    view.inputChange();
    expect(view.publish).toHaveBeenCalledWith('inputChange');
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