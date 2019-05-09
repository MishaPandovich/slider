import Model from '../src/js/components/Model';
import View from '../src/js/components/View';
import Controller from '../src/js/components/Controller';

beforeEach(function() {
  setFixtures('<div id="slider1" class="slider"><div class="slider__runner"><div class="slider__thumb"></div></div><input class="slider__change"><button class="slider__button">Изменить</button></div>');

  const sliderOptions = {
    min: 9,
    max: 100,
    current: 20,
    step: 5,
    position: 'horizontal',
    hasPointer: false
  };
  const model = new Model(sliderOptions);
  const view = new View($('#slider1'));
  const controller = new Controller(model, view);

  model.subscribe('changeValue', controller.changeValue.bind(controller));
  view.subscribe('inputChange', controller.onInputChange.bind(controller));
  view.subscribe('documentMouseMove', controller.onDocumentMouseMove.bind(controller));

  controller.initPlugin();

  window.model = model;
  window.view = view;
  window.controller = controller;
});
