import ViewScale from '../src/js/components/ViewScale';

describe('Тесты для ViewScale', function() {
  let viewScale, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"></div></div>');

    options = {
      min: 10,
      max: 50,
      step: 5,
      position: 'horizontal',
      pixelsPerValue: 2,
      elem: $('#slider1').find('.slider__runner')
    };

    viewScale = new ViewScale(options);
  });

  it('constructor', function() {
    spyOn(viewScale, 'createScale');
    viewScale.constructor(options);
    expect(viewScale.createScale).toHaveBeenCalledWith(options);
  });

  it('createScale', function() {
    viewScale.createScale(options);
    expect(options.elem.children()).toHaveClass('slider__scale');
  });
});