import './main.scss';
import './js/App.js';

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

$('#slider3').mySlider({
  min: 13,
  max: 120,
  current: [36, 48],
  step: 4,
  hasInterval: true,
  hasPointer: false,
  hasScale: false
});