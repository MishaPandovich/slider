import Model from './Model';
import View from './View';
import ViewThumb from './ViewThumb';
import ViewOptions from './ViewOptions';
import ViewScale from './ViewScale';
import Controller from './Controller';

(function($) {
  $.fn.mySlider = function(options={}) {
    options = $.extend({
      min: 0,
      max: 100,
      current: [0, 10],
      step: 1,
      isVertical: false,
      hasInterval: false,
      hasPointer: true,
      hasScale: true
    }, options);

    if (!$.isArray(options.current)) {
      options.current = [options.current, options.current];
    }
    else if (options.current.length === 1) {
      options.current[1] = options.current[0];
    }

    let init = () => {
      const model = new Model({
        min: options.min,
        max: options.max,
        current: options.current,
        step: options.step
      });

      const viewThumb = new ViewThumb({
        elem: this.find('.slider__runner'),
        isVertical: options.isVertical,
        hasInterval: options.hasInterval,
        hasPointer: options.hasPointer
      });

      const viewOptions = new ViewOptions({
        slider: this,
        isVertical: options.isVertical,
        hasInterval: options.hasInterval,
        hasPointer: options.hasPointer,
        hasScale: options.hasScale
      });

      const viewScale = new ViewScale({
        isVertical: options.isVertical,
        hasInterval: options.hasInterval
      });

      const view = new View({
        slider: this,
        isVertical: options.isVertical,
        hasInterval: options.hasInterval,
        hasPointer: options.hasPointer,
        hasScale: options.hasScale,
        viewThumb,
        viewOptions,
        viewScale
      });

      const controller = new Controller({ model, view });

      model.subscribe('changeValue', controller.changeValue.bind(controller));
      view.subscribe('onDocumentMouseMove', controller.onDocumentMouseMove.bind(controller));
      view.subscribe('setInitialValue', controller.setInitialValue.bind(controller));
      view.subscribe('showValue', ({ index, value, css, cssValue }) => {
        viewThumb.showValue({ index, value, css, cssValue });
        viewOptions.showValue({ index, value });
      });
      view.subscribe('updateThumbs', viewOptions.updateThumbs.bind(viewOptions));
      view.subscribe('onInputChange', controller.onInputChange.bind(controller));
      viewThumb.subscribe('onElemMouseDown', view.onElemMouseDown.bind(view));
      viewOptions.subscribe('onInputChange', view.onInputChange.bind(view));
      viewOptions.subscribe('update', update.bind(this));
      viewScale.subscribe('onClickScale', view.onClickScale.bind(view));

      controller.initPlugin();
    }

    let update = ({ prop, input }) => {
      input = $(input);

      if (!input.hasClass('slider__step')) {
        input.val(Math.round(input.val() / options.step) * options.step);
      }

      this.find('.slider__thumb').remove();
      this.find('.slider__tracker').remove();
      this.find('.slider__scale').remove();

      if (input.hasClass('slider__value')) {
        let index = this.find('.slider__value').index(input);
        options[prop][index] = input.val();
      }
      else if (input.parents('fieldset').hasClass('slider__inputs')) {
        options[prop] = input.val();
      }
      else {
        options[prop] = input.is(':checked');
      }

      init();
    }

    init();
  }
})(jQuery);