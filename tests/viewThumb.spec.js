import ViewThumb from '../src/js/components/ViewThumb';

describe('Тесты для ViewThumb', function() {
  let viewThumb, options,
      fn = function() { return 'fn' };

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"></div></div>');

    options = {
      elem: $('#slider1').find('.slider__runner'),
      isVertical: false,
      hasInterval: true,
      hasPointer: true
    };

    viewThumb = new ViewThumb(options);
    viewThumb.addThumbs();

    viewThumb.subscribe('onElemMouseDown', fn);
  });

  it('constructor', function() {
    expect(viewThumb.subscribers.any).toBeDefined();
    expect(viewThumb.elem).toBe(options.elem);
    expect(viewThumb.isVertical).toBe(options.isVertical);
    expect(viewThumb.hasInterval).toBe(options.hasInterval);
    expect(viewThumb.hasPointer).toBe(options.hasPointer);
  });

  it('addThumbs', function() {
    spyOn(viewThumb, 'createThumb');
    spyOn(viewThumb, 'addPointers');
    spyOn(viewThumb, 'onElemMouseDown');
    viewThumb.addThumbs();
    expect(viewThumb.createThumb).toHaveBeenCalled();
    expect(viewThumb.createThumb).toHaveBeenCalledWith('second');
    expect(viewThumb.addPointers).toHaveBeenCalled();
    expect(viewThumb.thumbElem).toHaveClass('slider__thumb');
    expect(viewThumb.tracker).toHaveClass('slider__tracker');
    expect(viewThumb.tracker.parent()).toHaveClass('slider__runner');

    expect($._data(viewThumb.thumbElem[0]).events.mousedown).toBeDefined();
    viewThumb.thumbElem.mousedown();
    expect(viewThumb.onElemMouseDown).toHaveBeenCalled();
  });

  it('createThumb', function() {
    viewThumb.createThumb('second');
    expect(viewThumb.elem.children()).toHaveClass('slider__thumb--second');
  });

  it('addPointers', function() {
    viewThumb.addPointers(viewThumb.isVertical);
    expect(viewThumb.viewPointer).toBeDefined();
    expect(viewThumb.thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValue', function() {
    viewThumb.addPointers(viewThumb.isVertical);
    spyOn(viewThumb.viewPointer, 'showValueOnPointers');
    spyOn(viewThumb, 'showTracker');
    let index = 0,
        value = 30,
        css = 'top',
        cssValue = '100px';
    viewThumb.showValue({ index, value, css, cssValue });
    expect(viewThumb.thumbElem.eq(index).css(css)).toBe(cssValue);
    expect(viewThumb.viewPointer.showValueOnPointers).toHaveBeenCalledWith({ index, value });
    expect(viewThumb.showTracker).toHaveBeenCalled();
  });

  it('showTracker', function() {
    viewThumb.isVertical = false;
    viewThumb.showTracker();
    expect(viewThumb.tracker.css('left')).toBe(parseInt(viewThumb.thumbElem.eq(0).css('left')) + viewThumb.thumbElem.width() - 2 + 'px');
    expect(viewThumb.tracker.css('right')).toBe(viewThumb.elem.width() - parseInt(viewThumb.thumbElem.css('left')) - 2 + 'px');

    viewThumb.isVertical = true;
    viewThumb.showTracker();
    expect(viewThumb.tracker.css('top')).toBe(parseInt(viewThumb.thumbElem.eq(0).css('top')) + viewThumb.thumbElem.height() - 2 + 'px');
    expect(viewThumb.tracker.css('bottom')).toBe(viewThumb.elem.height() - parseInt(viewThumb.thumbElem.css('top')) - 2 + 'px');
  });

  it('onElemMouseDown', function() {
    spyOn(viewThumb, 'publish');
    let fn = viewThumb.onElemMouseDown('event');
    expect(viewThumb.publish).toHaveBeenCalledWith('onElemMouseDown', 'event');
    expect(fn).toBeFalsy();
  });
});