import ViewThumb from '../src/js/components/ViewThumb';

describe('Тесты для вью', function() {
  let viewThumb, options, thumbElem;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input type="number" class="slider__input"></div>');

    options = {
      elem: $('#slider1').find('.slider__runner'),
      position: 'horizontal',
      hasInterval: true,
      hasPointer: true
    };
    thumbElem = $('.slider__thumb');

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
    let thumbElem = viewThumb.addThumbs();
    expect(viewThumb.createThumb).toHaveBeenCalled();
    expect(viewThumb.createThumb).toHaveBeenCalledWith('second');
    expect(viewThumb.addPointers).toHaveBeenCalledWith({ position: viewThumb.position, thumbElem });
    expect(thumbElem).toHaveClass('slider__thumb');
    expect($._data(thumbElem[0]).events.mousedown).toBeDefined();
  });

  it('createThumb', function() {
    viewThumb.createThumb('second');
    expect(viewThumb.elem.children()).toHaveClass('slider__thumb--second');
    expect(viewThumb.elem.parent('.slider').children()).toHaveClass('slider__input--second');
  });

  it('addPointers', function() {
    viewThumb.addPointers({ position: viewThumb.position, thumbElem });
    expect(thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValue', function() {
    let elem = thumbElem,
        value = 30;
    viewThumb.addPointers({ position: viewThumb.position, thumbElem });
    spyOn(viewThumb.viewPointer, 'showValueOnPointers');
    viewThumb.showValue({ elem, value });
    expect(viewThumb.viewPointer.showValueOnPointers).toHaveBeenCalledWith({ elem, value });
  });

  it('onElemMouseDown', function() {
    spyOn(viewThumb, 'publish');
    let fn = viewThumb.onElemMouseDown('event');
    expect(viewThumb.publish).toHaveBeenCalledWith('onElemMouseDown', 'event');
    expect(fn).toBeFalsy();
  });
});