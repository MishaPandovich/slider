import Observer from '../src/js/components/Observer';

describe('Тесты для обсервера', function() {
  beforeEach(function() {
    const observer = new Observer();
    window.observer = observer;
  });

  it('constructor', function() {
    expect(observer.subscribers.any).toBeDefined();
  });

  it('subscribe', function() {
    let sum = function(a, b) { return a + b; };
    let dif = function(a, b) { return a - b; };
    observer.subscribe('math', sum);
    observer.subscribe('math', dif);
    let subscriber1 = observer.subscribers.math[0];
    let subscriber2 = observer.subscribers.math[1];

    expect(subscriber1).toBe(sum);
    expect(subscriber1(6, 4)).toBe(10);

    expect(subscriber2).toBe(dif);
    expect(subscriber2(6, 4)).toBe(2);
  });

  it('publish', function() {
    let sum = function(a, b) { return resOfSum = a + b; };
    let dif = function(a, b) { return resOfDif = a - b; };
    let resOfSum, resOfDif;
    observer.subscribe('math', sum);
    observer.subscribe('math', dif);
    observer.publish('math', 6, 4);

    expect(resOfSum).toBe(10);
    expect(resOfDif).toBe(2);
  });
});