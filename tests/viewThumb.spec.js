import ViewThumb from '../src/js/components/ViewThumb';

describe('Тесты для ViewThumb', function() {
  let viewThumb, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input type="number" class="slider__input"></div>');

    options = {
      elem: $('#slider1').find('.slider__runner'),
      position: 'horizontal',
      hasInterval: true,
      hasPointer: true
    };

    viewThumb = new ViewThumb(options);
  });

  it('constructor', function() {
    expect(viewThumb.subscribers.any).toBeDefined();
    expect(viewThumb.elem).toBe(options.elem);
    expect(viewThumb.position).toBe(options.position);
    expect(viewThumb.hasInterval).toBe(options.hasInterval);
    expect(viewThumb.hasPointer).toBe(options.hasPointer);
  });

  it('addThumbs', function() {
    spyOn(viewThumb, 'createThumb');
    spyOn(viewThumb, 'addPointers');
    viewThumb.addThumbs();
    expect(viewThumb.createThumb).toHaveBeenCalled();
    expect(viewThumb.createThumb).toHaveBeenCalledWith('second');
    expect(viewThumb.addPointers).toHaveBeenCalledWith(viewThumb.position);
    expect(viewThumb.thumbElem).toHaveClass('slider__thumb');
    expect($._data(viewThumb.thumbElem[0]).events.mousedown).toBeDefined();
  });

  it('createThumb', function() {
    viewThumb.createThumb('second');
    expect(viewThumb.elem.children()).toHaveClass('slider__thumb--second');
    expect(viewThumb.elem.parent('.slider').children()).toHaveClass('slider__input--second');
  });

  it('addPointers', function() {
    viewThumb.thumbElem = $('.slider__thumb');
    viewThumb.addPointers(viewThumb.position);
    expect(viewThumb.viewPointer).toBeDefined();
    expect(viewThumb.thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValue', function() {
    let index = 0,
        value = 30,
        css = 'top',
        cssValue = '100px';
    viewThumb.thumbElem = $('.slider__thumb');
    viewThumb.addPointers(viewThumb.position);
    spyOn(viewThumb.viewPointer, 'showValueOnPointers');
    viewThumb.showValue({ index, value, css, cssValue });
    expect(viewThumb.thumbElem.eq(index).css(css)).toBe(cssValue);
    expect(viewThumb.viewPointer.showValueOnPointers).toHaveBeenCalledWith({ index, value });
  });

  it('onElemMouseDown', function() {
    spyOn(viewThumb, 'publish');
    let fn = viewThumb.onElemMouseDown('event');
    expect(viewThumb.publish).toHaveBeenCalledWith('onElemMouseDown', 'event');
    expect(fn).toBeFalsy();
  });
});