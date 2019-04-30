import Model from './components/Model';
import View from './components/View';
import Controller from './components/Controller';

(function($) {
  $.fn.mySlider = function(options={}) {
    options = $.extend({
      max: 100,
      value: 0,
      step: 1
    }, options);

    const sliderOptions = {
      max: options.max,
      value: options.value > options.max ? options.max : options.value,
      step: options.step >= 1 ? options.step : 1
    };

    const model = new Model(sliderOptions);
    const view = new View(this);
    const controller = new Controller(model, view);

    model.subscribe('changeValue', controller.changeValue.bind(controller));
    view.subscribe('documentMouseMove', controller.onDocumentMouseMove.bind(controller));

    controller.initPlugin();
  }
})(jQuery);