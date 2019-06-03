import ViewPointer from '../src/js/ViewPointer';

describe('Тесты для ViewPointer', function() {
  let viewPointer, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div></div>');

    options = {
      isVertical: false,
      thumbElem: $('#slider1').find('.slider__thumb')
    };

    viewPointer = new ViewPointer(options);
  });

  it('constructor', function() {
    spyOn(viewPointer, 'createPointer');
    viewPointer.constructor(options);
    expect(viewPointer.thumbElem).toBe(options.thumbElem);
    expect(viewPointer.createPointer).toHaveBeenCalledWith(options.isVertical);
  });

  it('createPointer', function() {
    viewPointer.createPointer(options.isVertical);
    expect(viewPointer.thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValueOnPointers', function() {
    let index = 0,
        value = 50;
    viewPointer.showValueOnPointers({ index, value });
    expect(viewPointer.thumbElem.eq(index).children().text()).toBe(String(value));
  });
});