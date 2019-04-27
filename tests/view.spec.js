import View from '../src/js/components/View';

setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

const view = new View($('#slider1'));

describe('Тесты для вью', function() {
  it('constructor', function() {
    expect(view.elem).toHaveClass('slider__runner');
    expect(view.thumbElem).toHaveClass('slider__thumb');
    expect(view.change).toHaveClass('slider__change');
    expect(view.button).toHaveClass('slider__button');
  });

  it('viewValue', function() {
    view.viewValue(60, 3);
    expect(view.thumbElem.css('left')).toBe('180px');
    expect(view.change.val()).toBe('60');
  });
});