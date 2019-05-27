import Model from './components/Model';
import View from './components/View';
import ViewThumb from './components/ViewThumb';
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
      hasPointer: true,
      hasScale: true
    }, options);

    const model = new Model({
      min: options.min,
      max: options.max,
      current: options.current,
      step: options.step
    });

    const viewThumb = new ViewThumb({
      elem: $(this).find('.slider__runner'),
      position: options.position,
      hasInterval: options.hasInterval,
      hasPointer: options.hasPointer
    });

    const view = new View({
      slider: this,
      position: options.position,
      hasScale: options.hasScale,
      viewThumb
    });

    const controller = new Controller({ model, view });

    model.subscribe('changeValue', controller.changeValue.bind(controller));
    view.subscribe('onInputChange', controller.onInputChange.bind(controller));
    view.subscribe('onDocumentMouseMove', controller.onDocumentMouseMove.bind(controller));
    view.subscribe('setInitialValue', controller.setInitialValue.bind(controller));
    view.subscribe('showValue', viewThumb.showValue.bind(viewThumb));
    view.subscribe('showTracker', viewThumb.showTracker.bind(viewThumb));
    viewThumb.subscribe('onElemMouseDown', view.onElemMouseDown.bind(view));

    controller.initPlugin();
  }
})(jQuery);