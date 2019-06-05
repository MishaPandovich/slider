# Range Slider (jQuery plugin)
[Demo](https://nelliza.github.io/slider/)

## Clone repository
```
$ git clone https://github.com/Nelliza/slider.git
```

## Installation
```
$ cd slider
$ npm i
$ npm run build
```

## Development
```
$ npm run dev
```

## Testing
```
$ npm run test
```

## Start

```
<div class='slider'></div>
```

*With default options:*
```
$('.slider').slider();
```

*With custom options:*
```
$('.slider').slider({
  isVertical: true,
  hasInterval: true,
  hasPointer: false,
  hasScale: false
});
```

## Options

| Name | Data Type | Default Value | Description |
| ------ | ------ | ------ | ------ |
| min | Number | 0 | The minimum value |
| max | Number | 100 | The maximum value |
| step | Number | 1 | The step size |
| current | Array | [0, 10] | Current value (if the slider is interval, you can set two different values) |
| isVertical | Boolean | false | If true, the slider will be vertical |
| hasInterval | Boolean | false | If true, the slider will be interval |
| hasPointer | Boolean | true | If set to true, sliders will be shown on their current value |
| hasScale | Boolean | true | If true, the scale will be displayed |

## Аrchitecture

#### 1. Model

#### 2. View

- ViewThumb
- ViewPointer
- ViewScale
- ViewOptions

#### 3. Controller

#### 4. App

#### 5. Observer

---

**Model** and **View** do not interact directly with each other. They notify **Controller** of changes using the **Observer** pattern. Accept constructor parameters from **App**.

**ViewThumb, ViewPointer, ViewScale** and **ViewOptions** are part of **View**. They notify **View** of changes using the **Observer** pattern.

**Controller** accepts **Model** and **View** as parameters. Handles user actions that **View** notifies of it.

---

## UML Diagram
![uml](/assets/uml.png)