const cssImport = document.createElement('link');
cssImport.rel = 'stylesheet';
cssImport.type = 'text/css';
cssImport.href = 'https://api.shoppingcart.services/widget/shopping-cart-style.css'

const jsMainImport = document.createElement('script');
jsMainImport.src = 'https://api.shoppingcart.services/widget/shopping-cart-widget.js';
jsMainImport.type = 'application/javascript';

document.getElementsByTagName('HEAD')[0].appendChild(cssImport);
document.getElementsByTagName('HEAD')[0].appendChild(jsMainImport);

