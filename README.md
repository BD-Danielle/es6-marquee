# Marquee README

## Introduction

The Marquee class provides a simple and customizable marquee effect for HTML elements. It allows the smooth scrolling of content within a specified container.

## Usage

To use the Marquee class, follow these steps:

### 1. Include the Marquee script in your HTML file

```html
<script src="path/to/marquee.js"></script>
```
### 2. Create an HTML structure

```html
<div class="marqueeWrapper">
  <ul id="yourMarqueeElement">
    <li>Item 1</li>
    <li>Item 2</li>
    <!-- Add more items as needed -->
  </ul>
</div>
```

### Initialize the Marquee
```javascript
// Instantiate Marquee with your configuration
const marqueeInstance = new Marquee('#yourMarqueeElement', {
  direction: 'horizontal',
  itemSelector: 'li',
  delay: 3000,
  speed: 1,
  timing: 1,
  mouse: true,
});
```
## Configuration Options

The Marquee class can be customized using the following configuration options:

- **direction** (string): Set the marquee direction, either `'horizontal'` or `'vertical'`. default is `'vertical'`.

- **itemSelector** (string): Selector for the marquee items. default is `'li'`.

- **delay** (number): Time in milliseconds before the marquee starts scrolling. default is `3000`.

- **speed** (number): Speed of the scrolling animation. default is `1`.

- **timing** (number): Timing interval for the scrolling animation. default is `1`.

- **mouse** (boolean): Enable/disable pausing on hover. default is `true`.

Feel free to adjust these options according to your specific requirements when initializing the Marquee instance.

## Example

To see the Marquee class in action, you can follow the provided example code. The following script initializes a Marquee instance with a specified configuration:

```javascript
// Instantiate Marquee with your configuration
const marqueeInstance = new Marquee('#yourMarqueeElement', {
  direction: 'horizontal',
  itemSelector: 'li',
  delay: 3000,
  speed: 1,
  timing: 1,
  mouse: true,
});
```
