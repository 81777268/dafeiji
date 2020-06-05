import 'lib-flexible/flexible.js';
const adaptive = require('./assets/js/des')

window.adaptive = adaptive;
window['adaptive'].desinWidth = 750;
window['adaptive'].baseFont = 18;
window['adaptive'].maxWidth = 480;
window['adaptive'].init();