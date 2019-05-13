import './main.scss';
import './js/slider.js';

$('#slider1').mySlider({
  min: 9,
  max: 100,
  current: 19,
  step: 5,
  hasPointer: true,
  hasInterval: true
});

$('#slider2').mySlider({
  min: 20,
  max: 100,
  current: 35,
  step: 10,
  position: 'vertical',
  hasPointer: true
});