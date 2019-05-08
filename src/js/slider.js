import Model from './components/Model';
import View from './components/View';
import Controller from './components/Controller';

(function($) {
  $.fn.mySlider = function(options={}) {
    options = $.extend({
      min: 0,
      max: 100,
      current: 0,
      step: 1,
      position: 'horizontal'
    }, options);

    const sliderOptions = {
      min: options.min,
      max: options.max,
      current: options.current,
      step: options.step,
      position: options.position
    };

    const model = new Model(sliderOptions);
    const view = new View(this);
    const controller = new Controller(model, view);

    model.subscribe('changeValue', controller.changeValue.bind(controller));
    view.subscribe('buttonClick', controller.onButtonClick.bind(controller));
    view.subscribe('documentMouseMove', controller.onDocumentMouseMove.bind(controller));

    controller.initPlugin();
  }
})(jQuery);