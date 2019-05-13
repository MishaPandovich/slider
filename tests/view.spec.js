import './beforeEach.js';

describe('Тесты для вью', function() {
  it('constructor', function() {
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.thumbElem).toHaveClass('slider__thumb');
    expect(view.change).toHaveClass('slider__change');
    expect(view.change).toHaveAttr('type', 'button');
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
    expect(view.inputChange).toHaveBeenCalledWith(view.change);
  });

  it('addSecondThumb', function() {
    view.addSecondThumb();
    expect(view.elem.children()).toHaveClass('slider__thumb--second');
    expect(view.elem.parent('.slider').children()).toHaveClass('slider__change--second');
    expect(view.thumbElem.length).toBe(2);
    expect(view.change.length).toBe(2);
  });

  it('setInputsAttr', function() {
    view.setInputsAttr(10, 30, 3);
    expect(view.change.attr('min')).toBe('10');
    expect(view.change.attr('max')).toBe('30');
    expect(view.change.attr('step')).toBe('3');
  });

  it('showVertical', function() {
    view.showVertical();
    expect(view.elem).toHaveClass('slider__runner--vertical');
  });

  it('addPointer', function() {
    view.addPointer('horizontal');
    expect(view.thumbElem.children()).toHaveClass('slider__pointer');

    view.addPointer('vertical');
    expect(view.thumbElem.children()).toHaveClass('slider__pointer slider__pointer--left');
  });

  it('showValue', function() {
    view.addSecondThumb();
    view.addPointer('horizontal');
    let elem = view.thumbElem.eq(0);
    view.showValue(elem, 60, 10, 3, 'horizontal');
    expect(elem.css('left')).toBe('150px');
    expect(view.change.eq(0)).toHaveValue('60');
    expect(elem.find('.slider__pointer')).toHaveHtml('60');

    view.addPointer('vertical');
    elem = view.thumbElem.eq(1);
    view.showValue(elem, 70, 10, 3, 'vertical');
    expect(elem.css('top')).toBe('180px');
    expect(view.change.eq(1)).toHaveValue('70');
    expect(elem.find('.slider__pointer--left')).toHaveHtml('70');
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
    let elem = view.change.eq(0);
    view.inputChange(elem, {});
    expect(view.publish).toHaveBeenCalledWith('inputChange', elem);
  });

  it('documentMouseMove', function() {
    spyOn(view, 'publish');
    let elem = view.change.eq(0);
    view.documentMouseMove(elem, {});
    expect(view.publish).toHaveBeenCalledWith('documentMouseMove', elem, {});
  });

  it('onDocumentMouseUp', function() {
    view.onDocumentMouseUp();
    expect($._data(document).events).not.toBeDefined();
  });
});