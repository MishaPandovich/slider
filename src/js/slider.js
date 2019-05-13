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
      position: 'horizontal',
      hasPointer: false,
      hasInterval: false
    }, options);

    const sliderOptions = {
      min: options.min,
      max: options.max,
      current: options.current,
      step: options.step,
      position: options.position,
      hasPointer: options.hasPointer,
      hasInterval: options.hasInterval
    };

    const model = new Model(sliderOptions);
    const view = new View(this);
    const controller = new Controller(model, view);

    model.subscribe('changeValue', $.proxy(controller.changeValue, controller));
    view.subscribe('inputChange', $.proxy(controller.onInputChange, controller));
    view.subscribe('documentMouseMove', $.proxy(controller.onDocumentMouseMove, controller));

    controller.initPlugin();
  }
})(jQuery);