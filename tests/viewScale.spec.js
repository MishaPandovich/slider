import ViewScale from '../src/js/components/ViewScale';

describe('Тесты для ViewScale', function() {
  let viewScale, options;

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div><div class="slider__thumb"></div></div></div>');

    options = {
      isVertical: false,
      hasInterval: true
    };

    viewScale = new ViewScale(options);
  });

  it('constructor', function() {
    expect(viewScale.subscribers.any).toBeDefined();
    expect(viewScale.isVertical).toBe(options.isVertical);
    expect(viewScale.hasInterval).toBe(options.hasInterval);
  });

  it('createScale', function() {
    spyOn(viewScale, 'onClickScale');
    let min = 10,
      max = 50,
      step = 5,
      pixelsPerValue = 2,
      elem = $('#slider1').find('.slider__runner'),
      thumbElem = elem.find('.slider__thumb');
    viewScale.createScale({ min, max, step, pixelsPerValue, elem, thumbElem });
    expect(elem.children()).toHaveClass('slider__scale');

    let li = elem.find('.slider__scale-item');
    expect($._data(li[0]).events.click).toBeDefined();
    li.eq(0).click();
    expect(viewScale.onClickScale).toHaveBeenCalled();
  });

  it('onClickScale', function() {
    spyOn(viewScale, 'publish');
    let min = 10,
      max = 50,
      step = 5,
      pixelsPerValue = 2,
      elem = $('#slider1').find('.slider__runner'),
      thumbElem = elem.find('.slider__thumb');
    viewScale.createScale({ min, max, step, pixelsPerValue, elem, thumbElem });

    let li = elem.find('.slider__scale-item')[0];
    li.innerHTML = '30';
    li.style.left = '120px';

    viewScale.hasInterval = true;
    viewScale.onClickScale(thumbElem, { target: li });
    expect(viewScale.publish).toHaveBeenCalledWith('onClickScale', {
      index: 1,
      value: '30',
      css: 'left',
      cssValue: '120px'
    });

    viewScale.hasInterval = false;
    viewScale.onClickScale(thumbElem, { target: li });
    expect(viewScale.publish).toHaveBeenCalledWith('onClickScale', {
      index: 0,
      value: '30',
      css: 'left',
      cssValue: '120px'
    });
  });
});