import Model from '../src/js/components/Model';

const sliderOptions = {
  max: 100,
  value: 20,
  step: 5
};

const model = new Model(sliderOptions);

describe('Тесты для модели', function() {
  beforeEach(function() {
    model.getCoords(310, 10);
    model.setValue(model.value);
  });

  it('constructor', function() {
    expect(model.max).toBe(100);
    expect(model.value).toBe(20);
    expect(model.step).toBe(5);
  });

  it('getCoords', function() {
    model.getCoords(400, 20);
    expect(model.rightEdge).toBe(380);
    expect(model.pixelsPerValue).toBe(3.8);
  });

  it('moveTo', function() {
    expect(model.moveTo(-10)).toBe(0);
    expect(model.moveTo(310)).toBe(300);
  });

  it('setValue', function() {
    model.setValue(12);
    expect(model.pixelsWithStep).toBe(10);

    model.setValue(23, true);
    expect(model.pixelsWithStep).toBe(10);
  });
});