#!/bin/zsh

set -e

mkdir ../build/AWS

cp ../src/include-widget.js ../build/AWS/include-widget.js
cp ../build/static/js/shopping-cart-widget.js ../build/AWS/shopping-cart-widget.js
cp ../build/static/css/shopping-cart-style.css ../build/AWS/shopping-cart-style.css

aws s3 sync ../build/AWS s3://widget-cart/script/
