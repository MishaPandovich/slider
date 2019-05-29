import './main.scss';
import './js/slider.js';

$('#slider1').mySlider({
  min: 9,
  max: 150,
  current: [100, 115],
  step: 10,
  hasInterval: true
});

$('#slider2').mySlider({
  min: 20,
  max: 100,
  current: 36,
  step: 15,
  isVertical: true
});