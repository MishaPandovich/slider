import './beforeEach.js';

describe('Тесты для модели', function() {
  it('constructor', function() {
    expect(model.min).toBe(10);
    expect(model.max).toBe(100);
    expect(model.current).toBe(19);
    expect(model.step).toBe(5);
    expect(model.position).toBe('horizontal');
    expect(model.hasPointer).toBeFalsy();
    expect(model.hasInterval).toBeFalsy();
    expect(model.calcValue).toEqual([20]);
    expect(model.subscribers.any).toBeDefined();
  });

  it('getCoords', function() {
    model.getCoords(400, 20);
    expect(model.rightEdge).toBe(380);
    expect(model.pixelsPerValue).toBe(4.222222222222222);
  });

  it('setValue', function() {
    spyOn(model, 'publish').and.callThrough();
    let elem = document.querySelector('.slider__thumb--first');
    model.setValue(22, elem);
    expect(model.calcValue[0]).toBe(20, elem);
    expect(model.publish).toHaveBeenCalledWith('changeValue', elem, 20);
  });

  it('moveTo', function() {
    model.calcValue[0] = 20;
    model.calcValue[1] = 90;
    let elem = $(document.querySelector('.slider__thumb--first'));
    expect(model.moveTo(-10, elem)).toBe(10);
    expect(model.moveTo(110, elem)).toBe(90);

    elem = $(document.querySelector('.slider__thumb--second'));
    expect(model.moveTo(-10, elem)).toBe(20);
    expect(model.moveTo(110, elem)).toBe(100);
  });
});