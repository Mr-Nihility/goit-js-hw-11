import { Spinner } from 'spin.js';

const opts = {
  lines: 10, // The number of lines to draw
  length: 20, // The length of each line
  width: 20, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 0.5, // Corner roundness (0..1)
  speed: 2, // Rounds per second
  rotate: 1, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: 'blue', // CSS color or array of colors
  fadeColor: '#fffff', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};
const spiner = new Spinner(opts);
export { spiner };
