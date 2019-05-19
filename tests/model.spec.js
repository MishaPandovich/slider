import Model from '../src/js/components/Model';

describe('Тесты для модели', function() {
  let model;

  beforeEach(function() {
    model = new Model({
      min: 9,
      max: 200,
      current: 19,
      step: 10
    });
  });

  it('constructor', function() {
    expect(model.subscribers.any).toBeDefined();
    expect(model.step).toBe(10);
    expect(model.min).toBe(10);
    expect(model.max).toBe(200);
    expect(model.current).toBe(19);
    expect(model.calcValue).toEqual([]);
  });

  it('setValue', function() {
    spyOn(model, 'publish');
    let options = {
      index: 0,
      value: model.current,
      elem: {}
    };
    model.setValue(options);
    expect(model.calcValue[0]).toBe(20);
    expect(model.publish).toHaveBeenCalledWith('changeValue', {
      index: options.index,
      elem: options.elem,
      value: 20
    });
  });

  it('checkValue', function() {
    model.calcValue[0] = 20;
    model.calcValue[1] = 190;

    let options = {
      index: 0,
      value: -10
    };
    expect(model.checkValue(options)).toBe(10);

    options.value = 210;
    expect(model.checkValue(options)).toBe(190);

    options = {
      index: 1,
      value: -10
    };
    expect(model.checkValue(options)).toBe(20);

    options.value = 210;
    expect(model.checkValue(options)).toBe(200);
  });
});