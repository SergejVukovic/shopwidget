const cssImport = document.createElement('link');
cssImport.rel = 'stylesheet';
cssImport.type = 'text/css';
cssImport.href = 'https://shopwidget.sergejvukovic.com/shopwidget-style.css'

const jsMainImport = document.createElement('script');
jsMainImport.src = 'https://shopwidget.sergejvukovic.com/shopwidget-main.js';
jsMainImport.type = 'application/javascript';

const jsRuntimeImport = document.createElement('script');
jsRuntimeImport.src = 'https://shopwidget.sergejvukovic.com/shopwidget-runtime.js';
jsRuntimeImport.type = 'application/javascript';

const jsReactImport = document.createElement('script');
jsReactImport.src = 'https://shopwidget.sergejvukovic.com/shopwidget-react.js';
jsReactImport.type = 'application/javascript';


document.getElementsByTagName('HEAD')[0].appendChild(cssImport);
document.getElementsByTagName('HEAD')[0].appendChild(jsRuntimeImport);
document.getElementsByTagName('HEAD')[0].appendChild(jsReactImport);
document.getElementsByTagName('HEAD')[0].appendChild(jsMainImport);

