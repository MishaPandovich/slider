import ViewPointer from '../src/js/components/ViewPointer';

describe('Тесты для ViewPointer', function() {
  let viewPointer, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input type="number" class="slider__input"></div>');

    options = {
      position: 'horizontal',
      thumbElem: $('#slider1').find('.slider__thumb')
    };

    viewPointer = new ViewPointer(options);
  });

  it('constructor', function() {
    spyOn(viewPointer, 'createPointer');
    viewPointer.constructor(options);
    expect(viewPointer.createPointer).toHaveBeenCalledWith(options);
  });

  it('createPointer', function() {
    viewPointer.createPointer(options);
    expect(options.thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValueOnPointers', function() {
    viewPointer.showValueOnPointers({
      elem: options.thumbElem,
      value: 50
    });
    expect(options.thumbElem.text()).toBe('50');
  });
});