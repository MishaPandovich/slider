import View from '../src/js/components/View';
import ViewThumb from '../src/js/components/ViewThumb';

describe('Тесты для вью', function() {
  let view, viewThumb, thumbElem,
      fn = function() { return 'fn'; };

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input type="number" class="slider__input"></div>');

    viewThumb = new ViewThumb({
      elem: $('.slider__runner'),
      position: 'horizontal',
      hasInterval: false,
      hasPointer: false
    });

    view = new View({
      slider: $('#slider1'),
      position: 'horizontal',
      hasScale: false,
      viewThumb
    });

    view.pixelsPerValue = 2;
    view.input = $('.slider__input');
    thumbElem = $('.slider__thumb');

    view.subscribe('onDocumentMouseMove', fn);
    view.subscribe('showValue', fn);
  });

  it('constructor', function() {
    expect(view.subscribers.any).toBeDefined();
    expect(view.slider).toHaveClass('slider');
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.position).toBe('horizontal');
    expect(view.hasScale).toBeFalsy();
    expect(view.viewThumb).toBe(viewThumb);
  });

  it('init', function() {
    spyOn(view, 'showPosition');
    spyOn(view.viewThumb, 'addThumbs');
    spyOn(view, 'setInputs');
    spyOn(view, 'getCoords');
    view.hasScale = true;
    let options = {
      min: 10,
      max: 50,
      step: 5
    };
    view.init(options);
    expect(view.showPosition).toHaveBeenCalled();
    expect(view.viewThumb.addThumbs).toHaveBeenCalled();
    expect(view.setInputs).toHaveBeenCalled();
    expect(view.getCoords).toHaveBeenCalled();
    expect(view.viewScale).toBeDefined();
  });

  it('showPosition', function() {
    view.position = 'vertical';
    view.showPosition();
    expect(view.elem).toHaveClass('slider__runner--vertical');
  });

  it('setInputs', function() {
    spyOn(view, 'inputChange');
    let min = 0,
        max = 200,
        step = 20;
    view.setInputs({ min, max, step, thumbElem });
    expect(view.input).toHaveClass('slider__input');
    expect(view.input.attr('min')).toBe(String(min));
    expect(view.input.attr('max')).toBe(String(max));
    expect(view.input.attr('step')).toBe(String(step));
    expect($._data(view.input[0]).events.focusout).toBeDefined();

    view.input.focusout();
    expect(view.inputChange).toHaveBeenCalledWith({
      elem: $(view.input),
      thumbElem
    });
  });

  it('getCoords', function() {
    spyOn(view, 'publish');
    let min = 0,
        max = 200;
    view.getCoords({ min, max, thumbElem });
    expect(view.pixelsPerValue).toBe(2);
    expect(view.publish).toHaveBeenCalledWith('setInitialValue', thumbElem);
  });

  it('showValue', function() {
    let options = {
      value: 60,
      min: 10,
      index: 0,
      elem: thumbElem
    };
    view.showValue(options);
    expect(options.elem.css('left')).toBe('100px');
    expect(view.input.eq(options.index)).toHaveValue(String(options.value));

    view.position = 'vertical';
    options.value = 70;
    options.min = 5;
    view.showValue(options);
    expect(options.elem.css('top')).toBe('130px');
    expect(view.input.eq(options.index)).toHaveValue(String(options.value));
  });

  it('onElemMouseDown', function() {
    spyOn(view, 'onDocumentMouseMove').and.callThrough();
    spyOn(view, 'onDocumentMouseUp').and.callThrough();
    let e = {
      clientX: 350,
      clientY: 50,
      target: thumbElem[0]
    };
    view.onElemMouseDown(e);

    $(document).mousemove();
    expect(view.onDocumentMouseMove).toHaveBeenCalled();
    expect($._data(document).events.mousemove).toBeDefined();
    expect($._data(document).events.mouseup).toBeDefined();

    $(document).mouseup();
    expect(view.onDocumentMouseUp).toHaveBeenCalled();
    expect($._data(document).events).not.toBeDefined();
  });

  it('inputChange', function() {
    spyOn(view, 'publish');
    let elem = view.input.eq(0);
    elem.val(75);
    view.inputChange({ elem, thumbElem });
    expect(view.publish).toHaveBeenCalledWith('onInputChange', {
      index: 0,
      value: 75,
      elem: thumbElem.eq(0)
    });
  });

  it('onDocumentMouseMove', function() {
    spyOn(view, 'publish');
    let options = {
          elem: thumbElem.eq(0),
          shiftX: 5,
          shiftY: 10,
          sliderCoords: { top: 25, left: 40 }
        };
    view.onDocumentMouseMove(options, { clientX: 94, clientY: 55 });
    expect(view.publish).toHaveBeenCalledWith('onDocumentMouseMove', { elem: options.elem, value: 24.5 });
  });

  it('onDocumentMouseUp', function() {
    view.onDocumentMouseUp();
    expect($._data(document).events).not.toBeDefined();
  });
});