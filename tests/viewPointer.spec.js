import ViewPointer from '../src/js/components/ViewPointer';

describe('Тесты для ViewPointer', function() {
  let viewPointer, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div></div>');

    options = {
      position: 'horizontal',
      thumbElem: $('#slider1').find('.slider__thumb')
    };

    viewPointer = new ViewPointer(options);
  });

  it('constructor', function() {
    spyOn(viewPointer, 'createPointer');
    viewPointer.constructor(options);
    expect(viewPointer.thumbElem).toBe(options.thumbElem);
    expect(viewPointer.createPointer).toHaveBeenCalledWith(options.position);
  });

  it('createPointer', function() {
    viewPointer.createPointer(options.position);
    expect(viewPointer.thumbElem.children()).toHaveClass('slider__pointer');
  });

  it('showValueOnPointers', function() {
    viewPointer.showValueOnPointers({
      index: 0,
      value: 50
    });
    expect(viewPointer.thumbElem.children().text()).toBe('50');
  });
});