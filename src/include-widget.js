const cssImport = document.createElement('link');
cssImport.rel = 'stylesheet';
cssImport.type = 'text/css';
cssImport.href = 'https://d34eu55uw8coht.cloudfront.net/script/shopping-cart-style.css'

const jsMainImport = document.createElement('script');
jsMainImport.src = 'https://d34eu55uw8coht.cloudfront.net/script/shopping-cart-widget.js';
jsMainImport.type = 'application/javascript';

document.getElementsByTagName('HEAD')[0].appendChild(cssImport);
document.getElementsByTagName('HEAD')[0].appendChild(jsMainImport);

