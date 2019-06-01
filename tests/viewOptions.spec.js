import ViewOptions from '../src/js/components/ViewOptions';

describe('Тесты для ViewOptions', function() {
  let viewOptions, options,
      fn = function() { return 'fn' };

  beforeEach(function() {
    setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"><div class="slider__pointer"></div></div><div class="slider__thumb"><div class="slider__pointer"></div></div><div class="slider__tracker"></div><ul class="slider__scale"></ul></div><form class="slider__settings"><fieldset class="slider__checkboxes"><input class="slider__is-vertical"><input class="slider__has-interval"><input class="slider__has-pointer"><input class="slider__has-scale"></fieldset><fieldset class="slider__inputs"><input class="slider__min"><input class="slider__max"><input class="slider__step"><input class="slider__value slider__value--first" value="55"><input class="slider__value slider__value--second" value="60"></fieldset></form></div>');

    options = {
      slider: $('#slider1'),
      isVertical: false,
      hasInterval: true,
      hasPointer: true,
      hasScale: false
    };

    viewOptions = new ViewOptions(options);

    let min = 0,
        max = 200,
        step = 20;

    viewOptions.setInputs({ min, max, step });
  });

  it('constructor', function() {
    expect(viewOptions.subscribers.any).toBeDefined();
    expect(viewOptions.slider).toBe(options.slider);
    expect(viewOptions.isVertical).toBe(options.isVertical);
    expect(viewOptions.hasInterval).toBe(options.hasInterval);
    expect(viewOptions.hasPointer).toBe(options.hasPointer);
    expect(viewOptions.hasScale).toBe(options.hasScale);
  });

  it('setInputs', function() {
    spyOn(viewOptions, 'onInputChange');
    spyOn(viewOptions, 'updateInputs');
    let min = 0,
        max = 200,
        step = 20;
    viewOptions.hasInterval = false;
    viewOptions.setInputs({ min, max, step });
    expect(viewOptions.inputsVal).toHaveClass('slider__value');
    expect(viewOptions.inputsVal.attr('min')).toBe(String(min));
    expect(viewOptions.inputsVal.attr('max')).toBe(String(max));
    expect(viewOptions.inputsVal.attr('step')).toBe(String(step));
    expect(viewOptions.inputsVal.eq(1).parent().css('display')).toBe('none');

    viewOptions.hasInterval = true;
    viewOptions.setInputs({ min, max, step });
    expect(viewOptions.inputsVal.eq(1).parent().css('display')).toBe('block');
    expect(viewOptions.inputsVal.eq(0).attr('max')).toBe(viewOptions.inputsVal.eq(1).val());
    expect(viewOptions.inputsVal.eq(1).attr('min')).toBe(viewOptions.inputsVal.eq(0).val());

    expect($._data(viewOptions.inputsVal[0]).events.focusout).toBeDefined();
    viewOptions.inputsVal.eq(0).focusout();
    expect(viewOptions.onInputChange).toHaveBeenCalled();
    expect(viewOptions.updateInputs).toHaveBeenCalled();
  });

  it('updateThumbs', function() {
    spyOn(viewOptions, 'publish');
    viewOptions.updateThumbs(1);
    expect(viewOptions.publish).toHaveBeenCalledWith('update', {
      prop: 'current',
      input: viewOptions.inputsVal[1]
    });
  });

  it('updateInputs', function() {
    spyOn(viewOptions, 'publish');
    viewOptions.updateInputs('current', { target: 'target' });
    expect(viewOptions.publish).toHaveBeenCalledWith('update', {
      prop: 'current',
      input: 'target'
    });
  });

  it('showValue', function() {
    let index = 1,
        value = 30;
    viewOptions.showValue({ index, value });
    expect(viewOptions.inputsVal.eq(index).val()).toBe(String(value));
  });

  it('onInputChange', function() {
    spyOn(viewOptions, 'publish');
    viewOptions.onInputChange({ target: viewOptions.inputsVal[0] });
    expect(viewOptions.publish).toHaveBeenCalledWith('onInputChange', { index: 0, value: 55 });
  });
});