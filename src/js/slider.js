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
      hasInterval: false,
      hasPointer: true
    }, options);

    const modelOptions = {
      min: options.min,
      max: options.max,
      current: options.current,
      step: options.step
    };
    const viewOptions = {
      slider: this,
      position: options.position,
      hasInterval: options.hasInterval,
      hasPointer: options.hasPointer
    };

    const model = new Model(modelOptions);
    const view = new View(viewOptions);
    const controller = new Controller(model, view);

    model.subscribe('changeValue', $.proxy(controller.changeValue, controller));
    view.subscribe('inputChange', $.proxy(controller.onInputChange, controller));
    view.subscribe('documentMouseMove', $.proxy(controller.onDocumentMouseMove, controller));

    controller.initPlugin();
  }
})(jQuery);