import Model from './components/Model';
import View from './components/View';
import Controller from './components/Controller';

(function() {
  function mySlider(options={}) {
    options.max = options.max || 100;
    options.value = options.value || 0;
    options.step = options.step || 1;
    options.slider = options.slider || 'slider1';

    const sliderOptions = {
      max: options.max,
      value: options.value > options.max ? options.max : options.value,
      step: options.step >= 1 ? options.step : 1
    };

    const model = new Model(sliderOptions);
    const view = new View(document.getElementById(options.slider));
    const controller = new Controller(model, view);

    model.subscribe('changeValue', controller.changeValue.bind(controller));
    view.subscribe('documentMouseMove', controller.onDocumentMouseMove.bind(controller));

    controller.initPlugin();
  }

  window.mySlider = mySlider;
})();