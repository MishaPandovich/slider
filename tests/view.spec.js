import View from '../src/js/components/View';
import ViewThumb from '../src/js/components/ViewThumb';
import ViewOptions from '../src/js/components/ViewOptions';

describe('Тесты для вью', function() {
  let view, viewThumb, viewOptions, thumbElem,
      fn = function() { return 'fn' };

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div></div>');

    viewThumb = new ViewThumb({
      elem: $('.slider__runner'),
      isVertical: false,
      hasInterval: true,
      hasPointer: false
    });

    viewOptions = new ViewOptions({
      slider: $('#slider1'),
      isVertical: false,
      hasInterval: true,
      hasPointer: false,
      hasScale: false
    });

    view = new View({
      slider: $('#slider1'),
      isVertical: false,
      hasScale: false,
      viewThumb,
      viewOptions
    });

    view.pixelsPerValue = 2;
    thumbElem = $('.slider__thumb');

    view.subscribe('onDocumentMouseMove', fn);
    view.subscribe('updateThumbs', fn);
  });

  it('constructor', function() {
    expect(view.subscribers.any).toBeDefined();
    expect(view.slider).toHaveClass('slider');
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.isVertical).toBeFalsy();
    expect(view.hasScale).toBeFalsy();
    expect(view.viewThumb).toBe(viewThumb);
    expect(view.viewOptions).toBe(viewOptions);
  });

  it('init', function() {
    spyOn(view, 'showOrientation');
    spyOn(view.viewOptions, 'setInputs');
    spyOn(view.viewThumb, 'addThumbs');
    spyOn(view, 'getCoords');
    spyOn(view, 'publish');
    let min = 10,
        max = 50,
        step = 5,
        thumbElem = view.viewThumb.addThumbs();
    view.init({ min, max, step });
    expect(view.showOrientation).toHaveBeenCalled();
    expect(view.viewOptions.setInputs).toHaveBeenCalledWith({ min, max, step });
    expect(view.viewThumb.addThumbs).toHaveBeenCalled();
    expect(view.getCoords).toHaveBeenCalledWith({ min, max, thumbElem });
    expect(view.publish).toHaveBeenCalledWith('setInitialValue', thumbElem);
    expect(view.elem.children()).toHaveClass('slider__scale');
    expect(view.elem.find('.slider__scale').css('opacity')).toBe('0');
  });

  it('showOrientation', function() {
    view.isVertical = true;
    view.showOrientation();
    expect(view.elem).toHaveClass('slider__runner--vertical');

    view.isVertical = false;
    view.showOrientation();
    expect(view.elem).not.toHaveClass('slider__runner--vertical');
  });

  it('getCoords', function() {
    let min = 0,
        max = 200;
    view.getCoords({ min, max, thumbElem });
    expect(view.pixelsPerValue).toBe(2);
  });

  it('showValue', function() {
    spyOn(view, 'publish');
    view.isVertical = false;
    let index = 0,
        value = 60,
        min = 10;
    view.showValue({ index, value, min });
    expect(view.publish).toHaveBeenCalledWith('showValue', {
      index,
      value,
      css: 'left',
      cssValue: '100px'
    });

    view.isVertical = true;
    value = 70;
    min = 5;
    view.showValue({ index, value, min });
    expect(view.publish).toHaveBeenCalledWith('showValue', {
      index,
      value,
      css: 'top',
      cssValue: '130px'
    });
  });

  it('onInputChange', function() {
    spyOn(view, 'publish');
    let index = 0,
        value = 75;
    view.onInputChange({ index, value });
    expect(view.publish).toHaveBeenCalledWith('onInputChange', { index, value });
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
    expect($._data(document).events.mousemove).toBeDefined();
    expect($._data(document).events.mouseup).toBeDefined();

    $(document).mousemove();
    expect(view.onDocumentMouseMove).toHaveBeenCalled();

    $(document).mouseup();
    expect(view.onDocumentMouseUp).toHaveBeenCalled();
    expect($._data(document).events).not.toBeDefined();
  });

  it('onDocumentMouseMove', function() {
    spyOn(view, 'publish');
    let options = {
          elem: thumbElem.eq(0),
          shiftX: 5,
          shiftY: 10,
          sliderCoords: { top: 25, left: 40 }
        };
    view.onDocumentMouseMove(options, {
      clientX: 94,
      clientY: 55
    });
    expect(view.publish).toHaveBeenCalledWith('onDocumentMouseMove', {
      elem: options.elem,
      value: 24.5
    });
  });

  it('onDocumentMouseUp', function() {
    spyOn(view, 'publish');
    view.onDocumentMouseUp(thumbElem.eq(0));
    expect($._data(document).events).not.toBeDefined();
    expect(view.publish).toHaveBeenCalledWith('updateThumbs', 0);
  });
});