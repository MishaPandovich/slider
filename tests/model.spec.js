import './beforeEach.js';

describe('Тесты для модели', function() {
  it('constructor', function() {
    expect(model.min).toBe(10);
    expect(model.max).toBe(100);
    expect(model.current).toBe(20);
    expect(model.step).toBe(5);
    expect(model.position).toBe('horizontal');
    expect(model.subscribers.any).toBeDefined();
  });

  it('getCoords', function() {
    model.getCoords(400, 20);
    expect(model.rightEdge).toBe(380);
    expect(model.pixelsPerValue).toBe(4.222222222222222);
  });

  it('moveTo', function() {
    expect(model.moveTo(-10)).toBe(10);
    expect(model.moveTo(110)).toBe(100);
  });

  it('setValue', function() {
    spyOn(view, 'viewValue').and.callThrough();
    model.setValue(22);
    expect(model.calcValue).toBe(20);
    expect(view.viewValue).toHaveBeenCalledWith(20, 10, 2.6666666666666665, 'horizontal');

    model.setValue(23, true);
    expect(model.calcValue).toBe(10);
    expect(view.viewValue).toHaveBeenCalledWith(10, 10, 2.6666666666666665, 'horizontal');
  });
});