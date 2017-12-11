<p align="center">
  <a href="http://ivomarsan.com/" target="_blank">
    <img width="128" src="http://ivomarsan.com/favicon.png">
  </a>
</p>

<p align="center">i-tooltip</p>

<p align="center">

  <a href="https://www.npmjs.com/package/i-tooltip">
    <img src="https://img.shields.io/npm/dt/i-tooltip.svg" alt="Downloads">
  </a>

  <a href="https://www.npmjs.com/package/i-tooltip">
    <img src="https://img.shields.io/npm/v/i-tooltip.svg" alt="Version">
  </a>

  <a href="https://www.npmjs.com/package/i-tooltip">
    <img src="https://img.shields.io/npm/l/i-tooltip.svg" alt="License">
  </a>
</p>

---

<a href="https://www.npmjs.com/package/i-tooltip">`i-tooltip`</a> is a
simplistic tooltip inspired in
<a href="http://material.google.com" target="_blank">Material Design</a> specs.

## Installation

Install via `npm`

```bash
npm install i-tooltip --save
```

Import or require in your code:

```javascript
import Vue from 'vue';
import iTooltip from 'i-tooltip';

// OR

var Vue = require('vue');
var iTooltip = require('i-tooltip');
```

### Module

```javascript
import iTooltip from 'i-tooltip';

// ...

export default {
  // ...
  components: {
    'my-awesome-tooltip': iTooltip,
  },
  // ...
};
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="dist/i-tooltip.min.js"></script>
<script>
Vue.use(iTooltip);

new Vue({
  el: '#app'
});
</script>
```

## Usage

It's very useful to use `i-tooltip` you only need to register then :smile: seems
like with

```html
<i-tooltip>Hello, I'm a Tooltip</i-tooltip>
```

You only need to pass a string with text from Tooltip, you also can chance
tooltip position with `is-position` property.

#### Position

> @type {String}

Avaliable options:

* `top`
* `left`
* `right`
* `bottom`

```html
<i-tooltip is-position="left">
  Tooltip Text
</i-tooltip>
```

Default is `top`.

#### Z-Index

> @type {String}

You only need to pass a `z-index` if you want change it.

```html
<i-tooltip is-z-index="50">
  Tooltip Text
</i-tooltip>
```

Default is `100`.
